cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            type:cc.Node,
            default:null,
        },
        scene1:{
            type:cc.Node,
            default:null,
        },
        scene2:{
            type:cc.Node,
            default:null,
        },
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


    },

    on_button_click(e){
        if(this.ruleArea.active==true){
            this.mask.active=false;
            this.ruleArea.active=false;
            this.state1.active=false;
            this.state2.active=false;
            this.state3.active=false;
            
        }else{
            //countinue
        }
    },

    start () {



    },

    // update (dt) {},
});
