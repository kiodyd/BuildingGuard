var mvs = require("Matchvs");
cc.Class({
    extends: cc.Component,

    properties: {
        
        
        defaultNode: {
            default: null,
            type: cc.Node
        },
        commonNode: {
            default: null,
            type: cc.Node
        },
        
        userIcon: {
            default: null,
            type: cc.Sprite
        },

        OwnIcon:cc.Node
        
    },

    init: function() {
        this.defaultNode.active = true;
        this.commonNode.active = false;
        this.userId = 0;
        clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },

    setData: function(userId,ownId) {
        this.userId = userId;

        this.defaultNode.active = false;
        this.commonNode.active = true;

        if(userId == ownId){
            this.OwnIcon.active = true;
        }

        Game.GameManager.userInfoReq(this.userId);
    },

    userInfoSet: function(recvMsg) {
        console.log("recvMsg:" + recvMsg);
        if (recvMsg.account == this.userId) {
            console.log("set user info");
            console.log(recvMsg);
            if (recvMsg.headIcon && recvMsg.headIcon !== "-") {
                cc.loader.load({url: recvMsg.headIcon, type: 'png'}, function(err, texture) {
                    var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));
                    if(this.userIcon) {
                        this.userIcon.spriteFrame = spriteFrame;
                    }
                }.bind(this));
            }
        }
    },

    onDestroy() {
        clientEvent.off(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    },


    // readyOrNot(rd){
    //     this.readyNode.active = rd;
    // }
});
