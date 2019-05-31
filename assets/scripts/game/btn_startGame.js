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
        btn_help:{
            type:cc.Node,
            default:null,
        },
        start_position:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    on_button_click(){
        this.node.parent = this.start_position;
        this.node.y = 0;
        this.node.x = 0;
        setTimeout(() => {
            this.scene1.active=false;
            this.scene2.active=true;
            this.btn_help.active=true;

        },200);

    },

    start () {


        
    },



    // update (dt) {},
});
