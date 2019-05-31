"use strict";
cc._RF.push(module, '24741aBqZZHibmCTZoa7/zH', 'btn_left');
// scripts/btn_left.js

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
        this.state2.active = true;
        this.state3.active = false;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();