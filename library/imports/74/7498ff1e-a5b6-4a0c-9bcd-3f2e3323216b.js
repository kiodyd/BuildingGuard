"use strict";
cc._RF.push(module, '7498f8epbZKDJvNPy4zIyFr', 'gameUserInfo');
// scripts/common/lobby/gameUserInfo.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        userIcon: {
            default: null,
            type: cc.Sprite
        },
        bg: cc.Node
    },

    init: function init() {
        this.number = '';
        this.userName = '', this.userId = 0;
        clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },

    setNum: function setNum(num) {
        this.number = num;
    },


    setData: function setData(userId) {
        this.userId = userId;
        this.userName = userId;
        Game.GameManager.userInfoReq(this.userId);
    },

    voteEvent: function voteEvent() {
        Game.GameEnv.vote(this);
    },
    setBig: function setBig() {
        var target = this.node;
        createjs.Tween.get(target).to({ width: 150 }, 300);
        createjs.Tween.get(target).to({ height: 150 }, 300);

        target = this.userIcon.node;
        createjs.Tween.get(target).to({ width: 150 }, 300);
        createjs.Tween.get(target).to({ height: 150 }, 300);

        target = this.bg;
        createjs.Tween.get(target).to({ width: 150 }, 300);
        createjs.Tween.get(target).to({ height: 150 }, 300);
    },
    setNormal: function setNormal() {
        var target = this.node;
        createjs.Tween.get(target).to({ width: 100 }, 300);
        createjs.Tween.get(target).to({ height: 100 }, 300);

        target = this.userIcon.node;
        createjs.Tween.get(target).to({ width: 100 }, 300);
        createjs.Tween.get(target).to({ height: 100 }, 300);

        target = this.bg;
        createjs.Tween.get(target).to({ width: 100 }, 300);
        createjs.Tween.get(target).to({ height: 100 }, 300);
    },
    setOut: function setOut() {
        this.node.parent = null;
    },


    userInfoSet: function userInfoSet(recvMsg) {
        console.log("recvMsg:" + recvMsg);
        if (recvMsg.account == this.userId) {
            console.log("set user info");
            console.log(recvMsg);
            this.userName = recvMsg.userName;
            if (recvMsg.headIcon && recvMsg.headIcon !== "-") {
                cc.loader.load({ url: recvMsg.headIcon, type: 'png' }, function (err, texture) {
                    var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
                    if (this.userIcon) {
                        this.userIcon.spriteFrame = spriteFrame;
                    }
                }.bind(this));
            }
        }
    },

    onDestroy: function onDestroy() {
        clientEvent.off(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    }
});

cc._RF.pop();