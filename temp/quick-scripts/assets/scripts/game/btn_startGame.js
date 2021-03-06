(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/btn_startGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6b98bk4ciFOEKe0W7YPLaLw', 'btn_startGame', __filename);
// scripts/btn_startGame.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            type: cc.Node,
            default: null
        },
        scene1: {
            type: cc.Node,
            default: null
        },
        scene2: {
            type: cc.Node,
            default: null
        },
        mask: {
            type: cc.Node,
            default: null
        },
        ruleArea: {
            type: cc.Node,
            default: null
        },
        state1: {
            type: cc.Node,
            default: null
        },
        state2: {
            type: cc.Node,
            default: null
        },
        state3: {
            type: cc.Node,
            default: null
        },
        btn_help: {
            type: cc.Node,
            default: null
        },
        start_position: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    on_button_click: function on_button_click() {
        var _this = this;

        this.node.parent = this.start_position;
        this.node.y = 0;
        this.node.x = 0;
        setTimeout(function () {
            _this.scene1.active = false;
            _this.scene2.active = true;
            _this.btn_help.active = true;
        }, 200);
    },
    start: function start() {}
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
        //# sourceMappingURL=btn_startGame.js.map
        