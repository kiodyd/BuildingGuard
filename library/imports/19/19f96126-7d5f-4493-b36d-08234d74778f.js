"use strict";
cc._RF.push(module, '19f96EmfV9Ek7NtCCNNdHeP', 'btn_ruleClose');
// scripts/btn_ruleClose.js

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    on_button_click: function on_button_click(e) {
        if (this.ruleArea.active == true) {
            this.mask.active = false;
            this.ruleArea.active = false;
            this.state1.active = false;
            this.state2.active = false;
            this.state3.active = false;
        } else {
            //countinue
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();