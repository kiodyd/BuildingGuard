(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/pageView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0ed6b3yYSxPLbgTDo/lW9aw', 'pageView', __filename);
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
        //# sourceMappingURL=pageView.js.map
        