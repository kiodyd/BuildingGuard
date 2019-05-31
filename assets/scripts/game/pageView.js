var mvs = require("Matchvs");





cc.Class({
    extends: cc.Component,

    properties: {
        pageViewN:cc.PageView,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log("index="+this.getPageIndex());
        GLB.levelIndex=this.getPageIndex();
    },

    getPageIndex(){
        this.pageIndex=this.pageViewN.getCurrentPageIndex()+1;
        return this.pageIndex;
    },

    onPageViewClick(){

        console.log("index="+this.getPageIndex());
        GLB.levelIndex=this.getPageIndex();
        clientEvent.dispatch(clientEvent.eventType.levelChangeSync);
    },

    // update (dt) {},


});
