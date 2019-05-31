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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        

    },

    start () {
        //this.voteNail(4);
    },


    voteNail(vote){
        this.nail1=this.node.getChildByName("nail1").getComponent(cc.Animation);
        this.nail2=this.node.getChildByName("nail2").getComponent(cc.Animation);
        this.nail3=this.node.getChildByName("nail3").getComponent(cc.Animation);
        this.nail4=this.node.getChildByName("nail4").getComponent(cc.Animation);
        if(vote>0){
            this.nail1.play();
            this.nail1.on("finished",function(){
                if(vote>1){
                    this.nail2.play();
                    this.nail2.on("finished",function(){
                        if(vote>2){
                            this.nail3.play();
                            this.nail3.on("finished",function(){
                                if(vote>3){
                                    this.nail4.play();
                                    this.nail4.on("finished",function(){
                                        console.log("over");
                                    },this);
                                }

                            },this);
                        }
                        
                    },this);
                }
                
            },this);
        }
    },

    // update (dt) {},
});
