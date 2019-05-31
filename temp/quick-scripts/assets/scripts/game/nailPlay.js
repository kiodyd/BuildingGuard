(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/nailPlay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '84aa2V7V65NnIHeV5gH76ka', 'nailPlay', __filename);
// scripts/nailPlay.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        //this.voteNail(4);
    },
    voteNail: function voteNail(vote) {
        this.nail1 = this.node.getChildByName("nail1").getComponent(cc.Animation);
        this.nail2 = this.node.getChildByName("nail2").getComponent(cc.Animation);
        this.nail3 = this.node.getChildByName("nail3").getComponent(cc.Animation);
        this.nail4 = this.node.getChildByName("nail4").getComponent(cc.Animation);
        if (vote > 0) {
            this.nail1.play();
            this.nail1.on("finished", function () {
                if (vote > 1) {
                    this.nail2.play();
                    this.nail2.on("finished", function () {
                        if (vote > 2) {
                            this.nail3.play();
                            this.nail3.on("finished", function () {
                                if (vote > 3) {
                                    this.nail4.play();
                                    this.nail4.on("finished", function () {
                                        console.log("over");
                                    }, this);
                                }
                            }, this);
                        }
                    }, this);
                }
            }, this);
        }
    }
}

// update (dt) {},
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
        //# sourceMappingURL=nailPlay.js.map
        