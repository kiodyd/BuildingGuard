require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"assistBar":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4a25dgKFrlI540xXphByaix', 'assistBar');
// scipts/assistBar.js

"use strict";

//用于控制辅助条的位置
cc.Class({
    extends: cc.Component,

    properties: {},

    // onLoad () {},

    onLoad: function onLoad() {
        this.activeNode = null;
        this.world = this.node.parent;
    },
    startAssist: function startAssist() {
        var _this = this;

        //获取当前控制的方块   
        this.world.children.forEach(function (element) {
            if (element.name == "AssistBar" || element.name == "plane") {
                //continue;
            } else if (element.getComponent("block").getInputEnabled()) {
                _this.activeNode = element;
            }
        });
    },
    update: function update(dt) {
        //调整辅助条的位置和宽度
        if (this.activeNode != null) {

            this.node.x = this.activeNode.x;
            this.node.width = this.activeNode.angle / 90 % 2 ? this.activeNode.height : this.activeNode.width;
            //this.node.rotation = this.activeNode.rotation;

        }
    }
});

cc._RF.pop();
},{}],"blockMaker":[function(require,module,exports){
"use strict";
cc._RF.push(module, '5717bhmCodF7L5ckxc/Ub0W', 'blockMaker');
// scipts/blockMaker.js

"use strict";

//生成方块
cc.Class({
    extends: cc.Component,

    properties: {
        blocks: {
            default: [],
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.needUp = false; //是否需要增加方块
        this.currentBlock = null; //当前下落方块
        this.lastIndex = 0; //用于避免重复出现相同的方块
        this.start = false; //判断游戏开始

        //cc.log("playerstart:"+start);
    },
    update: function update(dt) {
        if (!this.currentBlock && this.start) {
            this.needUp = true;
        } else if (this.start) {
            var block = this.currentBlock.getComponent("block");
            if (block.getInputEnabled()) {
                this.needUp = false;
            } else {
                this.needUp = true;
            }
        }

        if (this.needUp) {
            var index;
            while (true) {
                index = Math.floor(Math.random() * this.blocks.length);
                if (index != this.lastIndex) {
                    this.lastIndex = index;
                    break;
                }
            }
            var node = cc.instantiate(this.blocks[index]);
            this.currentBlock = node;
            node.parent = this.node;
            //todo  改为动态调整
            node.y = 400;
            node.x = 0;
            this.needUp = false;

            //开启辅助条
            var assistBar = cc.find("Canvas/World/AssistBar");
            assistBar.active = true;
            assistBar.getComponent("assistBar").startAssist();
        }
    }
});

cc._RF.pop();
},{}],"block":[function(require,module,exports){
"use strict";
cc._RF.push(module, '395c3EwSQNPLI0SghZMqMSR', 'block');
// scipts/block.js

"use strict";

//用于每个方块的控制（emm可以优化结构，感觉一个控制器就够了）
cc.Class({
    extends: cc.Component,
    properties: {
        moveDist: cc.Float, //单次点击移动的位移
        inputEnabled: true, //该方块是否可以控制
        smooke: cc.Prefab
    },

    start: function start() {
        this.inputEnabled = true;
        this.moveDist = 12;
        this.mainCam = cc.Camera.main;
    },


    onLoad: function onLoad() {

        this.isStatic = true;
        this.collider = this.getComponent(cc.PhysicsCollider);
        this.rigidBody = this.getComponent(cc.RigidBody);

        //暂时关闭重力，并给方块一个匀速
        this.rigidBody.linearVelocity = cc.v2(0, -200);
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

    onDestroy: function onDestroy() {
        var touchReceiver = cc.Canvas.instance.node;
        touchReceiver.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        touchReceiver.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onTouchStart: function onTouchStart(event) {
        this.touchLoc = event.getLocation();

        // if(this.inputEnabled){
        //     this.startTime = true;
        //     this.tempTime = 0;
        //     this.startX = this.node.x;
        // }
    },
    onTouchMove: function onTouchMove(event) {
        // if(this.inputEnabled){
        //     this.node.x += event.getDelta().x * this.moveScale;
        // }

    },
    onTouchEnd: function onTouchEnd(event) {

        // if(this.inputEnabled){

        //     //根据触摸时间和节点移动距离 来判断是否只是单击屏幕
        //     if(this.tempTime < 0.15 && Math.abs(this.node.x - this.startX) < 7){
        //         this.node.angle += 90;
        //     }


        // }
        // this.startTime = false;

        if (this.inputEnabled) {

            //点击方块左边往左移动，右边右移，中间区域则变形方块,下滑则下降方块

            var aabb = this.collider.getAABB();
            var rigid = this.node.getComponent(cc.RigidBody);

            if (event.getLocation().y - this.touchLoc.y < -50) {
                this.fallDown();
            } else if (this.touchLoc.x < rigid.getWorldPosition().x + aabb.width / 2 && this.touchLoc.x > rigid.getWorldPosition().x - aabb.width / 2) {
                this.changeRota();
            } else {

                if (this.touchLoc.x >= rigid.getWorldPosition().x) {
                    cc.log("right");

                    this.node.x += parseFloat(this.moveDist);
                    rigid.awake = true;
                } else if (this.touchLoc.x < rigid.getWorldPosition().x) {
                    cc.log("left");

                    this.node.x += parseFloat(-this.moveDist);
                    rigid.awake = true;
                }
            }
        }
    },
    update: function update(dt) {},
    changeRota: function changeRota() {
        this.node.angle += 90;
    },
    fallDown: function fallDown() {
        this.rigidBody.linearVelocity = cc.v2(0, -640);
        //this.inputEnabled = false;
    },
    onBeginContact: function onBeginContact() {
        if (this.inputEnabled) {
            //抖动摄像头
            this.mainCam.getComponent(cc.Animation).play();
        }
    },


    onPreSolve: function onPreSolve(contact, selfCollider, otherCollider) {
        if (this.inputEnabled) {
            //落地时控制方块着地的速度
            selfCollider.body.linearVelocity = cc.v2(0, -70);
            //关闭辅助
            var assistBar = cc.find("Canvas/World/AssistBar");
            assistBar.active = false;
        }
    },

    onPostSolve: function onPostSolve(contact, selfCollider, otherCollider) {
        var _this = this;
        //落地后不再处理
        if (this.isStatic) {
            if (contact.getImpulse().normalImpulses[0] > 0) {
                this.rigidBody.gravityScale = this.gravityScale; //恢复原有重力
                this.isStatic = false;
                this.inputEnabled = false;

                //在碰撞点处生成尘土特效
                contact.getWorldManifold().points.forEach(function (element) {
                    var smoo = cc.instantiate(_this.smooke);
                    smoo.parent = _this.node;
                    smoo.position = _this.node.convertToNodeSpaceAR(element);
                });
            } else {
                contact.disabledOnce = true;
            }
        }
    },

    getInputEnabled: function getInputEnabled() {
        return this.inputEnabled;
    }
});

cc._RF.pop();
},{}],"gameManage":[function(require,module,exports){
"use strict";
cc._RF.push(module, '1ec3aR2L2xLSI5ZZMAWjeye', 'gameManage');
// scipts/gameManage.js

"use strict";

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

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
},{}],"player_headPortrait":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'dce7eRY9glJH6dXjyikMS+3', 'player_headPortrait');
// scipts/player_headPortrait.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        isroomer: {
            default: false,
            type: cc.boolean
        },

        headportrait: {
            default: [],
            type: cc.prefab
        }
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RF.pop();
},{}],"smooke":[function(require,module,exports){
"use strict";
cc._RF.push(module, '120eaa2Nt1C6pQtRQsq9Xp4', 'smooke');
// scipts/smooke.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    myselfDestroy: function myselfDestroy() {
        this.node.destroy();
    }

    // update (dt) {},

});

cc._RF.pop();
},{}]},{},["assistBar","block","blockMaker","gameManage","player_headPortrait","smooke"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY2lwdHMvYXNzaXN0QmFyLmpzIiwiYXNzZXRzL3NjaXB0cy9ibG9ja01ha2VyLmpzIiwiYXNzZXRzL3NjaXB0cy9ibG9jay5qcyIsImFzc2V0cy9zY2lwdHMvZ2FtZU1hbmFnZS5qcyIsImFzc2V0cy9zY2lwdHMvcGxheWVyX2hlYWRQb3J0cmFpdC5qcyIsImFzc2V0cy9zY2lwdHMvc21vb2tlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0k7O0FBRUE7O0FBSUE7O0FBRUE7QUFDSTtBQUNBO0FBQ0g7QUFFRDtBQUFhOztBQUNUO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFFRztBQUNIO0FBQ0o7QUFDSjtBQUVEO0FBQ0k7QUFDQTs7QUFFSTtBQUNBO0FBQ0E7O0FBR0g7QUFDSjtBQXBDSTs7Ozs7Ozs7OztBQ0RUO0FBQ0E7QUFDSTs7QUFFQTtBQUNJO0FBQ0k7QUFDQTtBQUZHOztBQURDOztBQVFaOztBQUVBOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSDtBQUVEO0FBQ0k7QUFDSTtBQUNIO0FBQ087QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBRVI7O0FBRUQ7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBM0RJOzs7Ozs7Ozs7O0FDRFQ7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFIUTs7QUFPWjtBQUNJO0FBQ0E7QUFDQTtBQUNIOzs7QUFJRDs7QUFFSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFFRDtBQUNJOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFSDtBQUdEO0FBQ0k7QUFDQTtBQUNBOztBQUVIO0FBRUQ7O0FBRUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUk7O0FBRUE7QUFDQTs7QUFFQTtBQUNJO0FBQ0g7QUFDRztBQUNIOztBQUdHO0FBQ0k7O0FBRUE7QUFDQTtBQUVIO0FBQ0c7O0FBRUE7QUFDQTtBQUVIO0FBQ0o7QUFFSjtBQUdKO0FBRUQ7QUFJQTtBQUNJO0FBQ0g7QUFFRDtBQUNJO0FBQ0E7QUFDSDtBQUdEO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDSjs7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUVKOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBRUo7QUFFRztBQUNIO0FBQ0o7QUFJSjs7QUFFRDtBQUNJO0FBQ0g7QUFqTEk7Ozs7Ozs7Ozs7QUNGVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDSTs7QUFFQTs7QUFJQTs7QUFFQTtBQUNJO0FBRUg7QUFFRDtBQWRLOztBQWlCTDtBQWpCSjs7Ozs7Ozs7OztBQ1ZBO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRks7O0FBS1Q7QUFDSTtBQUNBO0FBRlM7QUFQTDs7QUFhWjtBQUNBOztBQWpCSzs7Ozs7Ozs7OztBQ0VUO0FBQ0k7O0FBRUE7O0FBSUE7O0FBRUE7O0FBRUE7QUFJQTtBQUNJO0FBQ0g7O0FBRUQ7O0FBbkJLIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8v55So5LqO5o6n5Yi26L6F5Yqp5p2h55qE5L2N572uXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMud29ybGQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEFzc2lzdCgpeyAgICBcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeaOp+WItueahOaWueWdlyAgIFxyXG4gICAgICAgIHRoaXMud29ybGQuY2hpbGRyZW4uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC5uYW1lID09XCJBc3Npc3RCYXJcIiB8fCBlbGVtZW50Lm5hbWUgPT0gXCJwbGFuZVwiKXtcclxuICAgICAgICAgICAgICAgIC8vY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihlbGVtZW50LmdldENvbXBvbmVudChcImJsb2NrXCIpLmdldElucHV0RW5hYmxlZCgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTm9kZSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIC8v6LCD5pW06L6F5Yqp5p2h55qE5L2N572u5ZKM5a695bqmXHJcbiAgICAgICAgaWYodGhpcy5hY3RpdmVOb2RlICE9IG51bGwpe1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLmFjdGl2ZU5vZGUueDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gKHRoaXMuYWN0aXZlTm9kZS5hbmdsZSAvOTApJTI/dGhpcy5hY3RpdmVOb2RlLmhlaWdodDp0aGlzLmFjdGl2ZU5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIC8vdGhpcy5ub2RlLnJvdGF0aW9uID0gdGhpcy5hY3RpdmVOb2RlLnJvdGF0aW9uO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsIlxyXG4vL+eUn+aIkOaWueWdl1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJsb2Nrczp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6W10sXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuUHJlZmFiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubmVlZFVwID0gZmFsc2U7Ly/mmK/lkKbpnIDopoHlop7liqDmlrnlnZdcclxuICAgICAgICB0aGlzLmN1cnJlbnRCbG9jayA9IG51bGw7Ly/lvZPliY3kuIvokL3mlrnlnZdcclxuICAgICAgICB0aGlzLmxhc3RJbmRleCA9IDA7Ly/nlKjkuo7pgb/lhY3ph43lpI3lh7rnjrDnm7jlkIznmoTmlrnlnZdcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7Ly/liKTmlq3muLjmiI/lvIDlp4tcclxuICAgICAgICBcclxuICAgICAgICAvL2NjLmxvZyhcInBsYXllcnN0YXJ0OlwiK3N0YXJ0KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmN1cnJlbnRCbG9jayYmdGhpcy5zdGFydCl7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZFVwID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnN0YXJ0KXtcclxuICAgICAgICAgICAgICAgIGxldCBibG9jayA9IHRoaXMuY3VycmVudEJsb2NrLmdldENvbXBvbmVudChcImJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoYmxvY2suZ2V0SW5wdXRFbmFibGVkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZFVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRVcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5uZWVkVXApe1xyXG4gICAgICAgICAgICB2YXIgaW5kZXg7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKXtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuYmxvY2tzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSB0aGlzLmxhc3RJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmxvY2tzW2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJsb2NrID0gbm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIC8vdG9kbyAg5pS55Li65Yqo5oCB6LCD5pW0XHJcbiAgICAgICAgICAgIG5vZGUueSA9IDQwMDtcclxuICAgICAgICAgICAgbm9kZS54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5uZWVkVXAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8v5byA5ZCv6L6F5Yqp5p2hXHJcbiAgICAgICAgICAgIGxldCBhc3Npc3RCYXIgPSBjYy5maW5kKFwiQ2FudmFzL1dvcmxkL0Fzc2lzdEJhclwiKTtcclxuICAgICAgICAgICAgYXNzaXN0QmFyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFzc2lzdEJhci5nZXRDb21wb25lbnQoXCJhc3Npc3RCYXJcIikuc3RhcnRBc3Npc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIiwiXHJcbi8v55So5LqO5q+P5Liq5pa55Z2X55qE5o6n5Yi277yIZW1t5Y+v5Lul5LyY5YyW57uT5p6E77yM5oSf6KeJ5LiA5Liq5o6n5Yi25Zmo5bCx5aSf5LqG77yJXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtb3ZlRGlzdDogY2MuRmxvYXQsLy/ljZXmrKHngrnlh7vnp7vliqjnmoTkvY3np7tcclxuICAgICAgICBpbnB1dEVuYWJsZWQ6IHRydWUsLy/or6XmlrnlnZfmmK/lkKblj6/ku6XmjqfliLZcclxuICAgICAgICBzbW9va2U6Y2MuUHJlZmFiXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubW92ZURpc3QgPSAxMjtcclxuICAgICAgICB0aGlzLm1haW5DYW0gPSBjYy5DYW1lcmEubWFpbjtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0NvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLnJpZ2lkQm9keSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcblxyXG4gICAgICAgIC8v5pqC5pe25YWz6Zet6YeN5Yqb77yM5bm257uZ5pa55Z2X5LiA5Liq5YyA6YCfXHJcbiAgICAgICAgdGhpcy5yaWdpZEJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCAtMjAwKTtcclxuICAgICAgICB0aGlzLmdyYXZpdHlTY2FsZSA9IHRoaXMucmlnaWRCb2R5LmdyYXZpdHlTY2FsZTtcclxuICAgICAgICB0aGlzLnJpZ2lkQm9keS5ncmF2aXR5U2NhbGUgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy50ZW1wVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0WCA9IDA7XHJcblxyXG4gICAgICAgIC8vdGhpcy5hcHBseUxlZnQgPSBmYWxzZTtcclxuICAgICAgICAvL3RoaXMuYXBwbHlSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgdG91Y2hSZWNlaXZlciA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlO1xyXG4gICAgICAgIHRvdWNoUmVjZWl2ZXIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0b3VjaFJlY2VpdmVyLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgIHRvdWNoUmVjZWl2ZXIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHZhciB0b3VjaFJlY2VpdmVyID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XHJcbiAgICAgICAgdG91Y2hSZWNlaXZlci5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0b3VjaFJlY2VpdmVyLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICB0b3VjaFJlY2VpdmVyLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgIHRoaXMudG91Y2hMb2MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5pbnB1dEVuYWJsZWQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0YXJ0VGltZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMudGVtcFRpbWUgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0YXJ0WCA9IHRoaXMubm9kZS54O1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXRFbmFibGVkKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54ICogdGhpcy5tb3ZlU2NhbGU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Ub3VjaEVuZChldmVudCkge1xyXG5cclxuICAgICAgICAvLyBpZih0aGlzLmlucHV0RW5hYmxlZCl7XHJcblxyXG4gICAgICAgIC8vICAgICAvL+agueaNruinpuaRuOaXtumXtOWSjOiKgueCueenu+WKqOi3neemuyDmnaXliKTmlq3mmK/lkKblj6rmmK/ljZXlh7vlsY/luZVcclxuICAgICAgICAvLyAgICAgaWYodGhpcy50ZW1wVGltZSA8IDAuMTUgJiYgTWF0aC5hYnModGhpcy5ub2RlLnggLSB0aGlzLnN0YXJ0WCkgPCA3KXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hbmdsZSArPSA5MDtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRUaW1lID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRFbmFibGVkKXtcclxuXHJcbiAgICAgICAgICAgIC8v54K55Ye75pa55Z2X5bem6L655b6A5bem56e75Yqo77yM5Y+z6L655Y+z56e777yM5Lit6Ze05Yy65Z+f5YiZ5Y+Y5b2i5pa55Z2XLOS4i+a7keWImeS4i+mZjeaWueWdl1xyXG5cclxuICAgICAgICAgICAgdmFyIGFhYmIgPXRoaXMuY29sbGlkZXIuZ2V0QUFCQigpO1xyXG4gICAgICAgICAgICB2YXIgcmlnaWQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZ2V0TG9jYXRpb24oKS55IC0gdGhpcy50b3VjaExvYy55IDwgLTUwICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWxsRG93bigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy50b3VjaExvYy54IDwgcmlnaWQuZ2V0V29ybGRQb3NpdGlvbigpLnggKyBhYWJiLndpZHRoLzIgJiYgdGhpcy50b3VjaExvYy54ID4gcmlnaWQuZ2V0V29ybGRQb3NpdGlvbigpLnggLSBhYWJiLndpZHRoLzIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VSb3RhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvdWNoTG9jLnggPj0gcmlnaWQuZ2V0V29ybGRQb3NpdGlvbigpLnggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwicmlnaHRcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSBwYXJzZUZsb2F0KHRoaXMubW92ZURpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2lkLmF3YWtlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvdWNoTG9jLnggPCByaWdpZC5nZXRXb3JsZFBvc2l0aW9uKCkueCApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJsZWZ0XCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gcGFyc2VGbG9hdCgtdGhpcy5tb3ZlRGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaWQuYXdha2UgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjaGFuZ2VSb3RhKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSArPSA5MDtcclxuICAgIH0sXHJcblxyXG4gICAgZmFsbERvd24oKSB7XHJcbiAgICAgICAgdGhpcy5yaWdpZEJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCAtNjQwKTtcclxuICAgICAgICAvL3RoaXMuaW5wdXRFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkJlZ2luQ29udGFjdCgpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5wdXRFbmFibGVkKXtcclxuICAgICAgICAgICAgLy/mipbliqjmkYTlg4/lpLRcclxuICAgICAgICAgICAgdGhpcy5tYWluQ2FtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUHJlU29sdmU6IGZ1bmN0aW9uIChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpIHtcclxuICAgICAgICBpZih0aGlzLmlucHV0RW5hYmxlZCl7XHJcbiAgICAgICAgICAgIC8v6JC95Zyw5pe25o6n5Yi25pa55Z2X552A5Zyw55qE6YCf5bqmXHJcbiAgICAgICAgICAgIHNlbGZDb2xsaWRlci5ib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgLTcwKTtcclxuICAgICAgICAgICAgLy/lhbPpl63ovoXliqlcclxuICAgICAgICAgICAgbGV0IGFzc2lzdEJhciA9IGNjLmZpbmQoXCJDYW52YXMvV29ybGQvQXNzaXN0QmFyXCIpO1xyXG4gICAgICAgICAgICBhc3Npc3RCYXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBvblBvc3RTb2x2ZTogZnVuY3Rpb24gKGNvbnRhY3QsIHNlbGZDb2xsaWRlciwgb3RoZXJDb2xsaWRlcikge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy/okL3lnLDlkI7kuI3lho3lpITnkIZcclxuICAgICAgICBpZiAodGhpcy5pc1N0YXRpYykge1xyXG4gICAgICAgICAgICBpZiAoY29udGFjdC5nZXRJbXB1bHNlKCkubm9ybWFsSW1wdWxzZXNbMF0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2lkQm9keS5ncmF2aXR5U2NhbGUgPSB0aGlzLmdyYXZpdHlTY2FsZTsvL+aBouWkjeWOn+aciemHjeWKm1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+WcqOeisOaSnueCueWkhOeUn+aIkOWwmOWcn+eJueaViFxyXG4gICAgICAgICAgICAgICAgY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCkucG9pbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNtb28gPSBjYy5pbnN0YW50aWF0ZShfdGhpcy5zbW9va2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNtb28ucGFyZW50ID0gX3RoaXMubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBzbW9vLnBvc2l0aW9uID0gX3RoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWN0LmRpc2FibGVkT25jZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldElucHV0RW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEVuYWJsZWQ7XHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICAgICAgaXNyb29tZXI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OmZhbHNlLFxyXG4gICAgICAgICAgICB0eXBlOmNjLmJvb2xlYW4sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVhZHBvcnRyYWl0OntcclxuICAgICAgICAgICAgZGVmYXVsdDpbXSxcclxuICAgICAgICAgICAgdHlwZTpjYy5wcmVmYWIsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsIlxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG15c2VsZkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==