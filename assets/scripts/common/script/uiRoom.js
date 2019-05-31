var uiPanel = require("uiPanel");
var mvs = require("Matchvs");
cc.Class({
    extends: uiPanel,
    properties: {
        help:cc.Node,
    },




    onLoad() {
        this._super();

        this.help.active = true;
        this.players = [];
        this.roomId = 0;
        this.roomInfo = null;
        this.owner = 0;
        this.playerPrefab = this.nodeDict["player"];
        this.playerPrefab.active = false;
        //this.nodeDict["startGame"].on("click", this.startGame, this);
        this.nodeDict["prepare"].on("click", this.readyGame, this);
        this.nodeDict['invite'].on("click", this.inviteFriend, this);

        this.isPrepared = false;//是否准备
        this.prepared = new cc.Color(153, 153, 153);//准备时的颜色
        this.noprepared = new cc.Color(255, 255, 255);//未准备时的颜色


        clientEvent.on(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
        clientEvent.on(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
        clientEvent.on(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
        //clientEvent.on(clientEvent.eventType.kickPlayerResponse, this.kickPlayerResponse, this);
        //clientEvent.on(clientEvent.eventType.kickPlayerNotify, this.kickPlayerNotify, this);
        clientEvent.on(clientEvent.eventType.joinOverResponse, this.joinOverResponse, this);
        clientEvent.on(clientEvent.eventType.leaveRoomMedNotify, this.leaveRoomMedNotify, this);
        clientEvent.on(clientEvent.eventType.levelChangeSync, this.levelChangeSync, this);
        clientEvent.on(clientEvent.eventType.levelUpdate, this.levelUpdate, this);
        clientEvent.on(clientEvent.eventType.checkStart, this.checkStart, this);


        for (var i = 0; i < GLB.MAX_PLAYER_COUNT; i++) {
            var temp = cc.instantiate(this.playerPrefab);
            temp.active = true;
            temp.parent = this.nodeDict["玩家"];
            var roomUserInfo = temp.getComponent('roomUserInfo');
            roomUserInfo.init();
            this.players.push(roomUserInfo);
        }

    },

    // kickPlayerResponse: function(data) {
    //     for (var j = 0; j < this.players.length; j++) {
    //         if (this.players[j].userId === data.kickPlayerRsp.userID) {
    //             this.players[j].init();
    //             break;
    //         }
    //     }
    //     if (GLB.userInfo.id === data.kickPlayerRsp.userID) {
    //         GLB.isRoomOwner = false;
    //         uiFunc.closeUI(this.node.name);
    //         this.node.destroy();
    //     }
    // },

    // kickPlayerNotify: function(data) {
    //     for (var j = 0; j < this.players.length; j++) {
    //         if (this.players[j].userId === data.kickPlayerNotify.userId) {
    //             this.players[j].init();
    //             break;
    //         }
    //     }

    //     if (GLB.userInfo.id === data.kickPlayerNotify.userId) {
    //         GLB.isRoomOwner = false;
    //         uiFunc.closeUI(this.node.name);
    //         this.node.destroy();
    //     }
    // },




    joinRoomNotify: function (data) {

        if (GLB.isRoomOwner) {
            let ids = "";
            for (let i = 0; i < GLB.playerReady.length; i++) {
                ids += (GLB.playerReady[i] + ",");
            }
            mvs.engine.sendEventEx(0, JSON.stringify({
                action: GLB.PLAYER_SYNC,
                playerReadyIds: ids
            }), 0, [data.roomUserInfo.userId]);

            this.levelChangeSync();

        }

        var count = 0;
        for (var j = 0; j < this.players.length; j++) {
            count++;
            if (this.players[j].userId === 0) {
                this.players[j].setData(data.roomUserInfo.userId, this.ownerId);
                break;
            }
        }

        if (count === GLB.MAX_PLAYER_COUNT && GLB.isRoomOwner) {
            var result = mvs.engine.joinOver("");
            console.log("发出关闭房间的通知");
            if (result !== 0) {
                console.log("关闭房间失败，错误码：", result);
            }
        }


    },

    leaveRoomResponse: function (data) {
        if (data.leaveRoomRsp.status === 200) {
            console.log("离开房间成功！");
        } else {
            console.log("离开房间失败");
        }
        GLB.isRoomOwner = false;
        uiFunc.closeUI(this.node.name);
        this.node.destroy();
    },

    leaveRoomMedNotify: function (data) {
        for (var j = 0; j < this.players.length; j++) {
            if (this.players[j].userId === data.userID) {
                this.players[j].init();
                break;
            }
        }
        this.ownerId = data.owner;
        if (this.ownerId === GLB.userInfo.id) {
            GLB.isRoomOwner = true;
        }
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].userId !== 0) {
                this.players[i].setData(this.players[i].userId, this.ownerId);
            }
        }
        this.refreshStartBtn();
    },

    leaveRoomNotify: function (data) {
        for (var j = 0; j < this.players.length; j++) {
            if (this.players[j].userId === data.leaveRoomInfo.userId) {
                this.players[j].init();
                break;
            }
        }
        this.ownerId = data.leaveRoomInfo.owner;
        if (this.ownerId === GLB.userInfo.id) {
            GLB.isRoomOwner = true;
        }
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].userId !== 0) {
                this.players[i].setData(this.players[i].userId, this.ownerId);
            }
        }
        this.refreshStartBtn();
    },

    refreshStartBtn() {

    },

    quit: function () {
        mvs.engine.leaveRoom("");
    },


    readyGame() {

        if (this.isPrepared == false) {//若未准备
            this.nodeDict['prepare'].color = this.prepared;//颜色变暗
            this.isPrepared = true;
            this.nodeDict['blockInput'].active = true;//阻止触摸

            mvs.engine.sendEvent(JSON.stringify({
                action: GLB.PLAYER_READY,
                playerId: GLB.userInfo.id
            }));

            GLB.playerReady.push(String(GLB.userInfo.id));

            this.checkStart();
        } else {//若已准备
            this.nodeDict['prepare'].color = this.noprepared;//颜色变亮
            this.isPrepared = false;
            this.nodeDict['blockInput'].active = false;//允许触摸

            mvs.engine.sendEvent(JSON.stringify({
                action: GLB.PLAYER_Cancel_READY,
                playerId: GLB.userInfo.id
            }));

            let index = GLB.playerReady.indexOf(String(GLB.userInfo.id));
            if (index !== -1) {

                GLB.playerReady.splice(index, 1);
            }

        }


    },



    createRoomInit(rsp) {
        this.roomId = rsp.roomID;
        this.ownerId = rsp.owner;
        this.players[0].setData(this.ownerId, this.ownerId);
        GLB.isRoomOwner = true;

        this.nodeDict['tip'].active = true;
        this.refreshStartBtn();
        //this.nodeDict["prepare"].active = false;
    },

    joinRoomInit(roomUserInfoList, roomInfo) {
        roomUserInfoList.sort(function (a, b) {
            if (roomInfo.ownerId === b.userId) {
                return 1;
            }
            return 0;
        });
        this.ownerId = roomInfo.ownerId;
        for (var j = 0; j < roomUserInfoList.length; j++) {
            this.players[j].setData(roomUserInfoList[j].userId, this.ownerId);
        }
        this.refreshStartBtn();
        this.nodeDict['PGbackground'].getComponent(cc.PageView).enabled = false;
        //this.nodeDict["startGame"].active = false;
    },

    inviteFriend() {
        var url = cc.url.raw('resources/share.png');
        if (window.wx) {
            wx.shareAppMessage({
                title: "快和我一起加入建筑保卫战",
                imageUrl: url,
                query: 'id=' + GLB.roomId,
                complete: function () {
                    console.log(arguments);
                },
                success: function (shareTickets, groupMsgInfos) {
                    console.log(shareTickets);
                    console.log(groupMsgInfos);
                }
            })
        }

    },


    levelChangeSync() {
        mvs.engine.sendEvent(JSON.stringify({
            action: GLB.LEVEL_SYNC,
            levelIndex: GLB.levelIndex
        }));
    },

    levelUpdate() {

        var tagetPosX;
        switch (GLB.levelIndex) {
            case 1:
                tagetPosX = -375;
                break;
            case 2:
                tagetPosX = -1125;
                break;
            case 3:
                tagetPosX = -1875;
                break;
            default:
                console.log("error index");

        }

        var target = this.nodeDict["content"];
        createjs.Tween.get(target).to({ x: tagetPosX }, 1000).call(handleComplete);
        function handleComplete() {
            //渐变完成执行
        }
    },


    onDestroy() {
        clientEvent.off(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
        clientEvent.off(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
        clientEvent.off(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
        clientEvent.off(clientEvent.eventType.levelChangeSync, this.levelChangeSync, this);
        clientEvent.off(clientEvent.eventType.levelUpdate, this.levelUpdate, this);
        clientEvent.off(clientEvent.eventType.checkStart, this.checkStart, this);
    },

    checkStart() {

        if (GLB.isRoomOwner && GLB.playerReady.length === GLB.MAX_PLAYER_COUNT) {

            var userIds = [];
            var tempIds = [];
            var playerCnt = 0;

            for (var j = 0; j < this.players.length; j++) {
                if (this.players[j].userId !== GLB.userInfo.id) {
                    if (!GLB.playerReady.includes(String(this.players[j].userId))) {
                        break;
                    }
                }


                if (this.players[j].userId !== 0) {
                    playerCnt++;
                    userIds.push(this.players[j].userId);
                    tempIds.push(this.players[j].userId);
                }
            }


            if (playerCnt === GLB.MAX_PLAYER_COUNT) {


                GLB.playerUserIds = userIds;


                for (var i = 0, len = tempIds.length; i < len; i++) {
                    var j = Math.floor(Math.random() * (len - i));
                    
                    mvs.engine.sendEventEx(0, JSON.stringify({
                        action: GLB.CAMP,
                        camp: ((i%2 == 0)?0:1),
                    }), 0, [tempIds[j]]);
                    

                    for (var z = 0; z < GLB.playerUserIds.length; z++) {
                        if(GLB.playerUserIds[z] == tempIds[j]){
                            if(i%2 == 0){
                                GLB.good.push(z);
                            }else{
                                GLB.bad.push(z);
                            }
                        }
                    }

                    tempIds.splice(j,1);

                }
                //开始游戏信号改到接受完阵营分配后进行
                setTimeout(()=>{
                    var msg = {
                        action: GLB.GAME_START_EVENT,
                        userIds: GLB.playerUserIds
                    };
                    Game.GameManager.sendEventEx(msg);
                },500);
            }

        }

    }
});
