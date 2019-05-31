// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        background:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:


    checkProcess () {
        var getcosine=this.background.getComponent("getCosine");

        
        var value=getcosine.capture()*100 - 0.27;
        console.log("value="+value);
        this.node.getComponent(cc.ProgressBar).progress=value;
        
    },

    // update (dt) {},
});
