(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/btn_right.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce231nQE6hFDpItFyvPD1V1', 'btn_right', __filename);
// scripts/btn_right.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    on_button_click: function on_button_click(e) {
        this.state1.active = false;
        this.state2.active = false;
        this.state3.active = true;
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
        //# sourceMappingURL=btn_right.js.map
        