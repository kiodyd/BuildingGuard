(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/lobby/roomUserInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03ed8JZPJFK1I6th5/637fn', 'roomUserInfo', __filename);
// scripts/common/lobby/roomUserInfo.js

"use strict";

var mvs = require("Matchvs");
cc.Class({
    extends: cc.Component,

    properties: {

        defaultNode: {
            default: null,
            type: cc.Node
        },
        commonNode: {
            default: null,
            type: cc.Node
        },

        userIcon: {
            default: null,
            type: cc.Sprite
        },

        OwnIcon: cc.Node

    },

    init: function init() {
        this.defaultNode.active = true;
        this.commonNode.active = false;
        this.userId = 0;
        clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },

    setData: function setData(userId, ownId) {
        this.userId = userId;

        this.defaultNode.active = false;
        this.commonNode.active = true;

        if (userId == ownId) {
            this.OwnIcon.active = true;
        }

        Game.GameManager.userInfoReq(this.userId);
    },

    userInfoSet: function userInfoSet(recvMsg) {
        console.log("recvMsg:" + recvMsg);
        if (recvMsg.account == this.userId) {
            console.log("set user info");
            console.log(recvMsg);
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
}

// readyOrNot(rd){
//     this.readyNode.active = rd;
// }
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=roomUserInfo.js.map
        