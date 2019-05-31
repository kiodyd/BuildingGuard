
//用于控制辅助条的位置
cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    onLoad () {
        this.activeNode = null;
        this.world = this.node.parent;
        this.node.active=false;
    },

    startAssist(){    
        //获取当前控制的方块   
        if(Game.BlockManager.currentBlock){

            this.activeNode = Game.BlockManager.currentBlock;
        }
    },

    update (dt) {
        //调整辅助条的位置和宽度
        if(this.activeNode != null){

            this.node.x = this.activeNode.x;
            this.node.width = ((this.activeNode.rotation /90)%2?this.activeNode.height:this.activeNode.width)-10;
            //this.node.rotation = this.activeNode.rotation;


        }
    }

});
