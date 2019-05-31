"use strict";
cc._RF.push(module, '120eaa2Nt1C6pQtRQsq9Xp4', 'smooke');
// scripts/smooke.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    myselfDestroy: function myselfDestroy() {
        this.node.destroy();
    }

    // update (dt) {},

});

cc._RF.pop();