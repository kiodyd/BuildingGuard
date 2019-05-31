"use strict";
cc._RF.push(module, '8456f5yQrpIgIVeT4vIod0V', 'btn_help');
// scripts/btn_help.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

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

    onLoad: function onLoad() {
        this.node.active = false;
    },


    on_button_click: function on_button_click() {
        if (this.mask.active == false) {
            this.mask.active = true;
            this.ruleArea.active = true;
            this.state1.active = true;
            this.state2.active = false;
            this.state3.active = false;
        } else {
            //countinue
        }
    },

    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();