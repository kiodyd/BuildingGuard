"use strict";
cc._RF.push(module, 'e15a0SellRL6YcLfubCYSrA', 'uiCreateRoom');
// scripts/common/script/uiCreateRoom.js

"use strict";

var uiPanel = require("uiPanel");
var mvs = require("Matchvs");
cc.Class({
    extends: uiPanel,
    properties: {},

    onLoad: function onLoad() {
        this._super();
        //this.playerCntLb = this.nodeDict["playerCnt"].getComponent(cc.Label);
        //this.playerCnt = GLB.PLAYER_COUNTS[0];
        //this.playerCntLb.string = this.playerCnt;
        this.nodeDict["quit"].on("click", this.quit, this);
        this.nodeDict["create"].on("click", this.createRoom, this);

        clientEvent.on(clientEvent.eventType.createRoomResponse, this.createRoomResponse, this);
    },


    quit: function quit() {
        uiFunc.closeUI(this.node.name);
        this.node.destroy();
    },

    createRoom: function createRoom() {
        Game.GameManager.blockInput();

        var create = new mvs.CreateRoomInfo();
        create.roomName = this.nodeDict["roomName"].getComponent(cc.EditBox).string;
        GLB.MAX_PLAYER_COUNT = 5;
        create.maxPlayer = GLB.MAX_PLAYER_COUNT;
        create.mode = 0;
        create.canWatch = 0;
        create.visibility = 1;
        create.roomProperty = GLB.MAX_PLAYER_COUNT;
        var result = mvs.engine.createRoom(create, { maxPlayer: GLB.MAX_PLAYER_COUNT });
        if (result !== 0) {
            console.log('创建房间失败,错误码:' + result);
        }
    },

    createRoomResponse: function createRoomResponse(data) {
        var status = data.rsp.status;
        if (status !== 200) {
            console.log('创建房间失败,异步回调错误码: ' + status);
        } else {
            console.log('创建房间成功:' + JSON.stringify(data.rsp));
            console.log('房间号: ' + data.rsp.roomID);
            GLB.roomId = data.rsp.roomID;

            if (cc.Canvas.instance.designResolution.height > cc.Canvas.instance.designResolution.width) {
                uiFunc.openUI("uiRoomVer", function (obj) {
                    var room = obj.getComponent('uiRoom');
                    room.createRoomInit(data.rsp);
                    uiFunc.closeUI(this.node.name);
                    this.node.destroy();
                }.bind(this));
            } else {
                uiFunc.openUI("uiRoom", function (obj) {
                    var room = obj.getComponent('uiRoom');
                    room.createRoomInit(data.rsp);
                    uiFunc.closeUI(this.node.name);
                    this.node.destroy();
                }.bind(this));
            }
        }
    },

    onDestroy: function onDestroy() {
        if (window.wx) {
            wx.offKeyboardComplete();
            wx.offKeyboardInput();
            wx.hideKeyboard();
        }
        clientEvent.off(clientEvent.eventType.createRoomResponse, this.createRoomResponse, this);
    }
});

cc._RF.pop();