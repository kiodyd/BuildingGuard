"use strict";
cc._RF.push(module, '0ed6b3yYSxPLbgTDo/lW9aw', 'pageView');
// scripts/pageView.js

"use strict";

var mvs = require("Matchvs");

cc.Class({
    extends: cc.Component,

    properties: {
        pageViewN: cc.PageView
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        console.log("index=" + this.getPageIndex());
        GLB.levelIndex = this.getPageIndex();
    },
    getPageIndex: function getPageIndex() {
        this.pageIndex = this.pageViewN.getCurrentPageIndex() + 1;
        return this.pageIndex;
    },
    onPageViewClick: function onPageViewClick() {

        console.log("index=" + this.getPageIndex());
        GLB.levelIndex = this.getPageIndex();
        clientEvent.dispatch(clientEvent.eventType.levelChangeSync);
    }
}

// update (dt) {},


);

cc._RF.pop();