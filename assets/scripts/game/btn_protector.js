cc.Class({
    extends: cc.Component,

    properties: {

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
        this.state1.active=false;
        this.state2.active=true;
        this.state3.active=false;
    },
    
    start () {



    },

    // update (dt) {},
});
