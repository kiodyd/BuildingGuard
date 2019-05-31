var mvs = require("Matchvs");
var uiPanel = require("uiPanel");


cc.Class({
    extends: uiPanel,

    properties: {
        voteNode: cc.Node,
        voteTitle: cc.Node,
        voteRes: cc.Node,
        someTip: cc.Node, //点击可疑玩家
        complete: cc.Node,//完成度
        gameRes:cc.Node,//游戏结果
        playerlists1: {
            default: [],
            type: cc.Sprite
        },
        playerlists2: {
            default: [],
            type: cc.Sprite
        },
    },
    onLoad() {
        Game.GameEnv = this;

        this._super();
        this.players = [];
        this.votedPlayers = [];
        this.outPlayers = [];
        this.attentionPlayers = [];
        this.canVote = true;
        this.voteNums = { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 };

        clientEvent.on(clientEvent.eventType.roundStart, this.roundStart, this);
        clientEvent.on(clientEvent.eventType.gameOver, this.gameOver, this);
        clientEvent.on(clientEvent.eventType.leaveRoomMedNotify, this.leaveRoom, this);
        clientEvent.on(clientEvent.eventType.roundVote, this.voteStart, this);
        clientEvent.on(clientEvent.eventType.endVote, this.voteEnd, this);
        clientEvent.on(clientEvent.eventType.writeVote, this.writeVote, this);


        for (var i = 0; i < GLB.playerUserIds.length; i++) {
            var temp = cc.instantiate(this.nodeDict["playerPrefab"]);
            temp.active = true;
            temp.parent = this.nodeDict["player"];
            var gameUserInfo = temp.getComponent('gameUserInfo');
            gameUserInfo.init();
            gameUserInfo.setData(GLB.playerUserIds[i]);
            gameUserInfo.setNum('p' + (i + 1));
            this.players.push(gameUserInfo);
        }


        //判断自己的序号
        var myNum =0;
        for(var i =1;i<=GLB.playerUserIds.length;i++){
            if(GLB.playerUserIds[i-1] == GLB.userInfo.id){
                myNum = i;
                break;
            }
        }
        GLB.mySName = "p" + myNum; 
    },
    showVoteResult(userName, isOut, index) {
        this.voteTitle.active = false;
        this.someTip.active = false;
        this.voteRes.active = true;
        this.nodeDict["player"].active = true;
        for (let i = 0; i < this.players.length; i++) {
            var a = ("p" + (i + 1));
            this.players[i].node.getChildByName("nail").active = true;
            this.players[i].node.getChildByName("nail").getComponent("nailPlay").voteNail(this.voteNums[a]);
        }
        if (isOut) {
            this.voteRes.children[0].active = true;
            this.nodeDict["userName"].getComponent(cc.Label).string = userName;

            //var target = this.players[index - 1].node;
            var a = "p" + index;
            console.log("a " + a);
            this.players[index - 1].setOut();
            this.nodeDict["outPrefab"].active = true;
            this.nodeDict["outPrefab"].getComponent("gameUserInfo").userIcon.spriteFrame = this.players[index - 1].userIcon.spriteFrame;
            this.nodeDict["outPrefab"].getChildByName("nail").active = true;
            this.nodeDict["outPrefab"].getChildByName("nail").getComponent("nailPlay").voteNail(parseInt(this.voteNums[a]));
            //createjs.Tween.get(target).to({ height: 130 }, 300);
            // createjs.Tween.get(target).to({ width: 130 }, 300).call(()=>{
            //     target.parent = this.nodeDict["outPosition"].parent;
            //     createjs.Tween.get(target).to({ x: this.nodeDict["outPosition"].x }, 500);
            //     createjs.Tween.get(target).to({ y: this.nodeDict["outPosition"].y }, 500);
            // });

        } else {
            this.voteRes.children[1].active = true;
        }


    },
    closeVote() {
        this.voteTitle.active = true;
        this.someTip.active = true;
        this.voteRes.active = false;
        this.voteRes.children[0].active = false;
        this.voteRes.children[1].active = false;
        this.nodeDict["userName"].getComponent(cc.Label).string = "";
        this.voteNode.active = false;
        this.nodeDict["player"].active = true;

        this.players.forEach(pl => {
            pl.node.getChildByName("nail").active = false;
            this.nodeDict["outPrefab"].getChildByName("nail").active = false;
            this.nodeDict["outPrefab"].active = false;
            if (this.outPlayers.includes(pl.number)) {
                pl.setOut();
            }
        });

    },
    nextPlayerTurn() {

        this.complete.getComponent("bar_cosine").checkProcess();

        

        if(this.outPlayers.includes(GLB.mySName)){
            return;
        }

        if (GLB.isRoomOwner) {
            Game.BlockManager.checkNeed(GLB.userInfo.id);

        } else {
            mvs.engine.sendEventEx(0, JSON.stringify(
                {
                    action: GLB.NEED_UP,
                    playerId: GLB.userInfo.id
                }
            ), 0, [GLB.playerUserIds[0]]);
        }


    },

    writeVote(data) {
        let playerNum = 0;
        for (let i = 1; i <= GLB.playerUserIds.length; i++) {
            if (GLB.playerUserIds[i - 1] == data) {
                playerNum = i;
                break;
            }
        }
        if (playerNum > 0) {
            let a = "p" + playerNum;
            this.voteNums[a] += 1;

        }
    },



    resetVote() {
        this.voteNums = { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 };
    },

    voteStart() {
        let self = this;
        this.nodeDict["player"].active = false;
        if (this.voteNode.active === false && this.canVote) {
            this.resetVote();
            this.canVote = false;
            this.voteNode.active = true;
            this.nodeDict["vote"].active = true;
            this.nodeDict["voteLayout"].removeAllChildren(true);
            for (let i = 0; i < this.players.length; i++) {
                if (this.players[i].userId == GLB.userInfo.id) {
                    continue;
                }
                if (!this.outPlayers.includes(this.players[i].number)) {
                    var temp = cc.instantiate(this.nodeDict["votePrefab"]);
                    temp.active = true;
                    temp.parent = this.nodeDict["voteLayout"];
                    var gameUserInfo = temp.getComponent('gameUserInfo');
                    gameUserInfo.init();
                    gameUserInfo.setData(this.players[i].userId);
                    gameUserInfo.setNum(this.players[i].number);
                    self.votedPlayers.push(temp);
                }
            }
        }


    },
    vote(someOneInfo) {

        if(this.outPlayers.includes(GLB.mySName)){
            uiFunc.openUI("uiTip", function (obj) {
                var uiTip = obj.getComponent("uiTip");
                if (uiTip) {
                    uiTip.setData("你已经被淘汰，不能参与投票哦");
                }
            }.bind(this));
            return;
        }



        uiFunc.openUI("uiTip", function (obj) {
            var uiTip = obj.getComponent("uiTip");
            if (uiTip) {
                uiTip.setData("你怀疑了" + someOneInfo.userName + "玩家");
            }
        }.bind(this));

        if (GLB.isRoomOwner) {
            this.writeVote(someOneInfo.userId);

        } else {
            mvs.engine.sendEventEx(0, JSON.stringify(
                {
                    action: GLB.VOTE_ONE,
                    playerId: someOneInfo.userId
                }
            ), 0, [GLB.playerUserIds[0]]);

        }


        this.votedPlayers.forEach(pl => {
            pl.getComponent(cc.Button).enabled = false;
        });
    },
    voteEnd(outs, attentions) {
        if (this.canVote) {
            return;
        }
        this.canVote = true;
        if (!GLB.isRoomOwner) {
            this.outPlayers = outs;
            this.attentionPlayers = attentions;
        }
        this.nodeDict["vote"].active = false;
        this.votedPlayers = [];

        if (this.attentionPlayers.length == 0) {
            let index = parseInt(this.outPlayers[this.outPlayers.length - 1][1]);

            this.showVoteResult(this.players[index - 1].userName, true, index);
        } else {
            this.showVoteResult("", false);
        }



    },

    checkResult() {

        let temp = this.voteNums;
        let playerSum = this.players.length;
        let res = Object.keys(temp).sort(function (a, b) { return temp[a] - temp[b]; });

        if (temp[res[playerSum - 1]] > temp[res[playerSum - 2]]) {

            this.outPlayers.push(res[playerSum - 1]);
            this.attentionPlayers = [];




        } else {
            this.attentionPlayers = [];
            let votes = temp[res[playerSum - 1]];
            this.attentionPlayers.push(res[playerSum - 1]);
            for (let i = playerSum - 2; i >= 0; i--) {
                if (temp[res[i]] < votes) {
                    break;
                } else {
                    this.attentionPlayers.push(res[i]);
                }
            }

        }


    },



    exit() {
        uiFunc.openUI("uiExit");
    },

    leaveRoom(data) {
        if (Game.GameManager.gameState !== GameState.Over) {
            uiFunc.openUI("uiTip", function (obj) {
                var uiTip = obj.getComponent("uiTip");
                if (uiTip) {
                    uiTip.setData("对手离开了游戏");
                }
            }.bind(this));
        }
    },


    gameOver: function () {
        //this.nodeDict['gameOver'].getComponent(cc.Animation).play();
        //this.nodeDict['gameOver'].getComponent(cc.AudioSource).play();
        this.complete.getComponent("bar_cosine").checkProcess();
        this.playerlists1[0].spriteFrame = this.players[GLB.good[0]].userIcon.spriteFrame;
        this.playerlists1[1].spriteFrame = this.players[GLB.good[1]].userIcon.spriteFrame;
        this.playerlists1[2].spriteFrame = this.players[GLB.good[2]].userIcon.spriteFrame;

        this.playerlists1[3].spriteFrame = this.players[GLB.good[0]].userIcon.spriteFrame;
        this.playerlists1[4].spriteFrame = this.players[GLB.good[1]].userIcon.spriteFrame;
        this.playerlists1[5].spriteFrame = this.players[GLB.good[2]].userIcon.spriteFrame;


        this.playerlists2[0].spriteFrame = this.players[GLB.bad[0]].userIcon.spriteFrame;;
        this.playerlists2[1].spriteFrame = this.players[GLB.bad[1]].userIcon.spriteFrame;;

        this.playerlists2[2].spriteFrame = this.players[GLB.bad[0]].userIcon.spriteFrame;;
        this.playerlists2[3].spriteFrame = this.players[GLB.bad[1]].userIcon.spriteFrame;;

        if (this.complete.getComponent(cc.ProgressBar).progress >= 60.0) {
            this.gameRes.active = true;
            this.gameRes.children[1].active =false;
        } else {
            this.gameRes.active = true;
            this.gameRes.children[0].active =false;
        }

    },
    end(){
        cc.director.loadScene("start_scene");
    },

    roundStart: function () {


    },


    currentPlayer() {
        if (this.cd != null && this.cd) {
            return;
        }
        this.cd = true;
        setTimeout(() => {
            this.cd = false;
        }, 1000);

        if (Game.GameManager.gameState == GameState.Play) {
            this.players.forEach(player => {
                player.setNormal();
            });
            if (GLB.nowPlayer != -1) {
                this.players[GLB.nowPlayer].setBig();
            }
        }

    },

    onDestroy() {

        clientEvent.off(clientEvent.eventType.leaveRoomMedNotify, this.leaveRoom, this);
        clientEvent.off(clientEvent.eventType.roundStart, this.roundStart, this);
        clientEvent.off(clientEvent.eventType.gameOver, this.gameOver, this);
        clientEvent.off(clientEvent.eventType.roundVote, this.voteStart, this);
        clientEvent.off(clientEvent.eventType.endVote, this.voteEnd, this);
        clientEvent.off(clientEvent.eventType.writeVote, this.writeVote, this);
    }
});
