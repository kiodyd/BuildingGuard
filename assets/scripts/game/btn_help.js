
cc.Class({
    extends: cc.Component,

    properties: {

        mask:{
            type:cc.Node,
            default:null,
        },
        ruleArea:{
            type:cc.Node,
            default:null,
        },
        state1:{
            type:cc.Node,
            default:null,
        },
        state2:{
            type:cc.Node,
            default:null,
        },
        state3:{
            type:cc.Node,
            default:null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active=false;
    },

    on_button_click:function(){
        if(this.mask.active==false){
            this.mask.active=true;
            this.ruleArea.active=true;
            this.state1.active=true;
            this.state2.active=false;
            this.state3.active=false;
        }else{
            //countinue
        }
    },

    start () {

    },

    update (dt) {

    },
});
