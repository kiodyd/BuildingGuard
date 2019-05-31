"use strict";
cc._RF.push(module, '6c8c6il0kBOBZw5ggskVmIQ', 'btn_prepared');
// scripts/btn_prepared.js

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

    properties: {
        blockInput: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.isPrepared = false; //是否准备
        this.prepared = new cc.Color(153, 153, 153); //准备时的颜色
        this.noprepared = new cc.Color(255, 255, 255); //未准备时的颜色
    },
    onClick_changeColor_blockInput: function onClick_changeColor_blockInput() {
        if (this.isPrepared == false) {
            //若未准备
            this.node.color = this.prepared; //颜色变暗
            this.isPrepared = true;
            this.blockInput.active = true; //阻止触摸
        } else {
            //若已准备
            this.node.color = this.noprepared; //颜色变亮
            this.isPrepared = false;
            this.blockInput.active = false; //允许触摸
        }
        cc.director.loadScene("game_scene");
    }
}

// update (dt) {},
);

cc._RF.pop();