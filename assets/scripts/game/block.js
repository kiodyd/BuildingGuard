var mvs = require("Matchvs");
//用于每个方块的控制（emm可以优化结构，感觉一个控制器就够了）
cc.Class({
    extends: cc.Component,

    properties: {
        moveDist: cc.Float,//单次点击移动的位移
        inputEnabled: true,//该方块是否可以控制
        smooke:cc.Prefab
    },


    start () {
        this.inputEnabled = true;
        this.moveDist = 12;
        this.direction = DirectState.None;

        this.mainCam = cc.Camera.main;
    },



    onLoad: function () {
        
        
        this.isStatic = true;
        this.collider = this.getComponent(cc.PhysicsCollider);
        this.rigidBody = this.getComponent(cc.RigidBody);

        //暂时关闭重力，并给方块一个匀速
        this.rigidBody.linearVelocity = cc.v2(0, -50);
        this.gravityScale = this.rigidBody.gravityScale;
        this.rigidBody.gravityScale = 0;


        this.tempTime = 0;
        this.startTime = false;
        this.startX = 0;

        //this.applyLeft = false;
        //this.applyRight = false;

        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

    },

    onDestroy() {
        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart(event) {
        this.touchLoc = event.getLocation();


        // if(this.inputEnabled){
        //     this.startTime = true;
        //     this.tempTime = 0;
        //     this.startX = this.node.x;
        // }

    },


    onTouchMove(event) {
        // if(this.inputEnabled){
        //     this.node.x += event.getDelta().x * this.moveScale;
        // }

    },

    onTouchEnd(event) {

        // if(this.inputEnabled){

        //     //根据触摸时间和节点移动距离 来判断是否只是单击屏幕
        //     if(this.tempTime < 0.15 && Math.abs(this.node.x - this.startX) < 7){
        //         this.node.angle += 90;
        //     }


        // }
        // this.startTime = false;

        if (Game.GameManager.gameState !== GameState.Play) return;

        if(Game.GameEnv.outPlayers.includes(GLB.mySName)){
            if (!this.isTipSecond) {
                uiFunc.openUI('uiTip', function (panel) {
                    var uiRoundTip = panel.getComponent('uiTip');
                    uiRoundTip.setData("你已经被淘汰！");
                })
            }
            this.isTipSecond = true;
            setTimeout(function () {
                this.isTipSecond = false;
            }.bind(this), 2000);
            return;
        }

        if (GLB.nowPlayerId !== GLB.userInfo.id) {
            if (!this.isTipSecond) {
                uiFunc.openUI('uiTip', function (panel) {
                    var uiRoundTip = panel.getComponent('uiTip');
                    uiRoundTip.setData("其他玩家的回合！");
                })
            }
            this.isTipSecond = true;
            setTimeout(function () {
                this.isTipSecond = false;
            }.bind(this), 2000);
            return;
        }


        


        if(this.inputEnabled){

            //点击方块左边往左移动，右边右移，中间区域则变形方块,下滑则下降方块

            var aabb =this.collider.getAABB();
            var rigid = this.node.getComponent(cc.RigidBody);
            if(this.touchLoc){
                if (event.getLocation().y - this.touchLoc.y < -50 ) {
                    //this.fallDown();
                    this.sendDirectMsg(DirectState.Down);
                } else if(this.touchLoc.x < rigid.getWorldPosition().x + aabb.width/2 && this.touchLoc.x > rigid.getWorldPosition().x - aabb.width/2){
                    //this.changeRota();
                    this.sendDirectMsg(DirectState.Change);
                }
                else {
                    
                    if (this.touchLoc.x >= rigid.getWorldPosition().x ) {
                        cc.log("right");
        
                        this.sendDirectMsg(DirectState.Right);
        
                    } else if (this.touchLoc.x < rigid.getWorldPosition().x ) {
                        cc.log("left");
        
                        this.sendDirectMsg(DirectState.Left);
        
                    }
                }
            }


        }


    },

    sendDirectMsg(direction) {
        if (Game.GameManager.gameState === GameState.Play) {
            mvs.engine.sendFrameEvent(JSON.stringify({
                action: GLB.DIRECTION,
                direction: direction
            }));
        }
    },
    moveRight() {
        this.node.x += parseFloat(this.moveDist);
        this.node.getComponent(cc.RigidBody).awake = true;
    },
    moveLeft() {
        this.node.x += parseFloat(-this.moveDist);
        this.node.getComponent(cc.RigidBody).awake = true;
    },

    update(dt) {
        
    },

    changeRota() {
        this.node.rotation += 90;
    },

    fallDown() {
        this.rigidBody.linearVelocity = cc.v2(0, -640);
        //this.inputEnabled = false;
    },


    move() {
        switch (this.direction) {
            case DirectState.None:
                break;
            case DirectState.Right:
                this.moveRight();
                break;
            case DirectState.Left:
                this.moveLeft();
                break;
            case DirectState.Down:
                this.fallDown();
                break;
            case DirectState.Change:
                this.changeRota();
                break;
        }
        this.direction = DirectState.None;
    },


    onBeginContact(){
        if (this.inputEnabled && Game.GameManager.gameState === GameState.Play) {
            //抖动摄像头
            this.mainCam.getComponent(cc.Animation).play();
            

            Game.GameEnv.nextPlayerTurn();
            
        }
    },

    onPreSolve: function (contact, selfCollider, otherCollider) {
        if (this.inputEnabled && Game.GameManager.gameState === GameState.Play) {
            //落地时控制方块着地的速度
            selfCollider.body.linearVelocity = cc.v2(0, -70);
            //关闭辅助
            let assistBar = this.node.parent.getChildByName("key_assistBar");
            assistBar.active = false;
        }
        
    },

    onPostSolve: function (contact, selfCollider, otherCollider) {
        let _this = this;
        //落地后不再处理
        if (this.isStatic) {
            if (contact.getImpulse().normalImpulses[0] > 0) {
                this.rigidBody.gravityScale = this.gravityScale;//恢复原有重力
                this.isStatic = false;
                this.inputEnabled = false;

                //在碰撞点处生成尘土特效
                contact.getWorldManifold().points.forEach(element => {
                    let smoo = cc.instantiate(_this.smooke);
                    smoo.parent = _this.node;
                    smoo.position = _this.node.convertToNodeSpaceAR(element);
                });
                
            }
            else {
                contact.disabledOnce = true;
            }
        }



    },

    getInputEnabled() {
        return this.inputEnabled;
    },
    setDirect(dir) {
        this.direction = dir;
    }


});
