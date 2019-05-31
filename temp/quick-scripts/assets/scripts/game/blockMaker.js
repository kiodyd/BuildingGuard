(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/blockMaker.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5717bhmCodF7L5ckxc/Ub0W', 'blockMaker', __filename);
// scripts/blockMaker.js

"use strict";

var mvs = require("Matchvs");
var stateSystem = require("StateSystem");
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
        this.isPlay = false; //是否开始下落

        this.index = 0;
        this.nextIndex = Math.floor(Math.random() * this.blocks.length);
        this.needUp = false; //是否需要增加方块
        this.currentBlock = null; //当前下落方块
        this.lastIndex = 0; //用于避免重复出现相同的方块

        this.needList = []; //等待更新方块的玩家
        Game.BlockManager = this;
    },


    sendUpdateBMsg: function sendUpdateBMsg() {
        var index;
        while (true) {
            index = Math.floor(Math.random() * this.blocks.length);
            if (index != this.lastIndex) {
                this.lastIndex = index;
                break;
            }
        }

        this.index = this.nextIndex;
        this.nextIndex = index;

        if (Game.GameManager.gameState === GameState.Play) {
            mvs.engine.sendFrameEvent(JSON.stringify({
                action: GLB.UPDATE_B,
                Index: this.index,
                NextIndex: this.nextIndex
            }));
        }
    },

    setNeedUp: function setNeedUp() {
        this.needUp = true;
    },
    setIndex: function setIndex(Index, NextIndex) {
        this.index = Index;
        this.nextIndex = NextIndex;
    },

    //检查是不是所有玩家都落地了
    checkNeed: function checkNeed(id) {
        if (!this.needList.includes(id)) {
            this.needList.push(id);
        }

        var count = Game.GameEnv.players.length - Game.GameEnv.outPlayers.length;
        if (this.needList.length == count) {
            if (stateSystem.playerFsm.state == "state_player_one") {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {
                        if (Game.GameEnv.outPlayers.includes("p4")) {
                            stateSystem.playerFsm.oneToPlayerFive();
                        } else {

                            stateSystem.playerFsm.oneToPlayerFour();
                        }
                    } else {

                        stateSystem.playerFsm.oneToPlayerThree();
                    }
                } else {

                    stateSystem.playerFsm.oneToPlayerTwo();
                }
            } else if (stateSystem.playerFsm.state == "state_player_two") {

                if (Game.GameEnv.outPlayers.includes("p3")) {
                    if (Game.GameEnv.outPlayers.includes("p4")) {
                        if (Game.GameEnv.outPlayers.includes("p5")) {
                            stateSystem.playerFsm.twoToPlayerEnd();
                        } else {

                            stateSystem.playerFsm.twoToPlayerFive();
                        }
                    } else {

                        stateSystem.playerFsm.twoToPlayerFour();
                    }
                } else {

                    stateSystem.playerFsm.twoToPlayerThree();
                }
            } else if (stateSystem.playerFsm.state == "state_player_three") {

                if (Game.GameEnv.outPlayers.includes("p4")) {
                    if (Game.GameEnv.outPlayers.includes("p5")) {
                        stateSystem.playerFsm.threeToPlayerEnd();
                    } else {

                        stateSystem.playerFsm.threeToPlayerFive();
                    }
                } else {

                    stateSystem.playerFsm.threeToPlayerFour();
                }
            } else if (stateSystem.playerFsm.state == "state_player_four") {

                if (Game.GameEnv.outPlayers.includes("p5")) {
                    stateSystem.playerFsm.fourToPlayerEnd();
                } else {

                    stateSystem.playerFsm.fourToPlayerFive();
                }
            } else if (stateSystem.playerFsm.state == "state_player_five") {
                stateSystem.playerFsm.fiveToPlayerEnd();
            }

            this.needList = [];
        }
    },


    // update (dt) {
    //     if(this.isPlay){
    //         if(!this.currentBlock){
    //             if(GLB.isRoomOwner && !this.needUpCD){
    //                 this.sendUpdateBMsg();
    //                 this.needUpCD = true;
    //                 setTimeout(function () {
    //                     this.needUpCD = false;
    //                 }.bind(this), 500);
    //             }
    //         }else{
    //             let block = this.currentBlock.getComponent("block");
    //             if (!block.getInputEnabled() && GLB.isRoomOwner && !this.needUpCD) {
    //                 this.sendUpdateBMsg();
    //                 this.needUpCD = true;
    //                 setTimeout(function () {
    //                     this.needUpCD = false;
    //                 }.bind(this), 500);
    //             }

    //         }
    //     }
    // },
    makeBlock: function makeBlock() {
        if (this.needUp) {
            clientEvent.dispatch(clientEvent.eventType.playerRound);

            var showNext = Game.GameEnv.nodeDict["Preview"];
            showNext.children.forEach(function (child) {
                child.active = false;
            });
            showNext.children[this.nextIndex].active = true;

            var node = cc.instantiate(this.blocks[this.index]);
            this.currentBlock = node;
            node.parent = this.node;
            //todo  改为动态调整
            node.y = 400;
            node.x = 0;
            this.needUp = false;

            //开启辅助条
            var assistBar = this.node.getChildByName("key_assistBar");
            assistBar.active = true;
            assistBar.getComponent("assistBar").startAssist();
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=blockMaker.js.map
        