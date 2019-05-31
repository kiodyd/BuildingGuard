"use strict";
cc._RF.push(module, 'cce4cH/sadGL76Mt1D3fgq1', 'btn_destroyer');
// scripts/btn_destroyer.js

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