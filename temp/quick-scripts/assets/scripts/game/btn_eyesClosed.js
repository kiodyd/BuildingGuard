(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/btn_eyesClosed.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ffd04MGJhdHNqei2uYemUsO', 'btn_eyesClosed', __filename);
// scripts/game/btn_eyesClosed.js

"use strict";

// var modulepi=require("playerSide");

cc.Class({
    extends: cc.Component,

    properties: {
        eyesOpen: cc.Node,
        map: cc.Node,
        nomap: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    btn_click: function btn_click() {
        if (this.eyesOpen.active == false) {
            //未开启地图提示
            if (GLB.camp == 1) {
                //为破坏者的时候
                this.eyesOpen.active = true;
                this.map.active = false;
                this.nomap.active = true;
            } else if (GLB.camp == 0) {
                //为保卫者的时候
                this.eyesOpen.active = true;
                this.map.active = true;
                this.nomap.active = false;
            }
            //console.log("playerSide.playerIndex="+Global_playerSide.playerIndex);
        } else {
            //已开启地图提示
            this.eyesOpen.active = false;
            this.map.active = false;
            this.nomap.active = false;
        }
    }

    // update (dt) {},

});

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
        //# sourceMappingURL=btn_eyesClosed.js.map
        