"use strict";
cc._RF.push(module, 'a2ac1zt+4JMWqN81o3uYJFo', 'playerSide');
// scripts/playerSide.js

"use strict";

var stateSystem = require("StateSystem");

cc.Class({
    extends: cc.Component,

    properties: {
        protector: cc.Node,
        destroyer: cc.Node,
        countDown: cc.Animation
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        if (GLB.camp == 1) {
            //若=1，为破坏者
            this.protector.active = false; //节点显示
            this.destroyer.active = true;
            this.destroyer.getComponent(cc.Animation).play(); //播放阵容提示
            this.destroyer.getComponent(cc.Animation).on("finished", function () {
                //结束后
                this.destroyer.active = false;
                console.log("anim_playerSide_finished");

                this.countDown.node.active = true;
                this.schedule(function () {
                    this.countDown.play(); //出现地图提示
                    console.log("conutDown_play");
                }.bind(this), 0, 0, 0.5);

                this.countDown.on("finished", function () {
                    //countdown结束
                    this.countDown.node.active = false;
                    console.log("anim_conutDown_finished");
                    Game.GameManager.gameState = GameState.Play;
                    stateSystem.mainFsm.toRoundOne();
                }.bind(this));
            }.bind(this));
        } else if (GLB.camp == 0) {
            this.protector.active = true; //节点显示
            this.destroyer.active = false;
            this.protector.getComponent(cc.Animation).play(); //播放阵容提示
            this.protector.getComponent(cc.Animation).on("finished", function () {
                //结束后
                this.protector.active = false;
                console.log("anim_playerSide_finished");

                this.countDown.node.active = true;
                this.schedule(function () {}.bind(this), 0, 1, 0.5);
                this.countDown.play(); //出现地图提示
                console.log("conutDown_play");
                this.countDown.on("finished", function () {
                    //countdown结束
                    this.countDown.node.active = false;
                    console.log("anim_conutDown_finished");
                    Game.GameManager.gameState = GameState.Play;
                    stateSystem.mainFsm.toRoundOne();
                }.bind(this));
            }.bind(this));
        }

        // modulepi.module_playerIndex=this.sideIndex;
        // console.log("moudule_playerIndex="+modulepi.moudule_playerIndex);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();