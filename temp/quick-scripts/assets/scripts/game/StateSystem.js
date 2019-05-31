(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/StateSystem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6c4cWRpENLz7y3bCQeICWy', 'StateSystem', __filename);
// scripts/game/StateSystem.js

"use strict";

var mvs = require("Matchvs");
var StateMachine = require("state-machine.min");
var mainFsm = new StateMachine({
    init: 'state_start',
    transitions: [{ name: 'toRoundOne', from: 'state_start', to: 'state_round_one' }, { name: 'toRoundTwo', from: 'state_round_one', to: 'state_round_two' }, { name: 'toVoteOne', from: 'state_round_two', to: 'state_vote_one' }, { name: 'toRoundThree', from: 'state_vote_one', to: 'state_round_three' }, { name: 'toVoteTwo', from: 'state_round_three', to: 'state_vote_two' }, { name: 'toRoundFour', from: 'state_vote_two', to: 'state_round_four' }, { name: 'toVoteThree', from: 'state_round_four', to: 'state_vote_three' }, { name: 'toRoundFive', from: 'state_vote_three', to: 'state_round_five' }, { name: 'toEnd', from: 'state_round_five', to: 'state_end' }],
    methods: {
        onToRoundOne: function onToRoundOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundOne
                }), 0, GLB.playerUserIds);
            }

            if (Game.GameEnv.outPlayers.includes("p1")) {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {

                        playerFsm.endToPlayerFour();
                    } else {

                        playerFsm.endToPlayerThree();
                    }
                } else {

                    playerFsm.endToPlayerTwo();
                }
            } else {

                playerFsm.endToPlayerOne();
            }
        },
        onToRoundTwo: function onToRoundTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundTwo
                }), 0, GLB.playerUserIds);
            }
            if (Game.GameEnv.outPlayers.includes("p1")) {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {

                        playerFsm.endToPlayerFour();
                    } else {

                        playerFsm.endToPlayerThree();
                    }
                } else {

                    playerFsm.endToPlayerTwo();
                }
            } else {

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteOne: function onToVoteOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);

                setTimeout(function () {

                    Game.GameEnv.checkResult();
                    var outs = "",
                        attentions = "",
                        voteNums = "";
                    for (var i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                        outs += Game.GameEnv.outPlayers[i] + ",";
                    }
                    for (var _i = 0; _i < Game.GameEnv.attentionPlayers.length; _i++) {
                        attentions += Game.GameEnv.attentionPlayers[_i] + ",";
                    }
                    for (var _i2 = 1; _i2 < 6; _i2++) {
                        var a = "p" + _i2;
                        voteNums += Game.GameEnv.voteNums[a] + ",";
                    }
                    mvs.engine.sendEventEx(0, JSON.stringify({
                        action: GLB.VOTE_END,
                        outs: outs,
                        attentions: attentions,
                        voteNums: voteNums
                    }), 0, GLB.playerUserIds);
                }, 6000);
            }
            setTimeout(function () {
                mainFsm.toRoundThree();
            }, 10000);
        },
        onToRoundThree: function onToRoundThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundThree
                }), 0, GLB.playerUserIds);
            }
            if (Game.GameEnv.outPlayers.includes("p1")) {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {

                        playerFsm.endToPlayerFour();
                    } else {

                        playerFsm.endToPlayerThree();
                    }
                } else {

                    playerFsm.endToPlayerTwo();
                }
            } else {

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteTwo: function onToVoteTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);
            }

            setTimeout(function () {
                Game.GameEnv.checkResult();
                var outs = "",
                    attentions = "",
                    voteNums = "";
                for (var i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                    outs += Game.GameEnv.outPlayers[i] + ",";
                }
                for (var _i3 = 0; _i3 < Game.GameEnv.attentionPlayers.length; _i3++) {
                    attentions += Game.GameEnv.attentionPlayers[_i3] + ",";
                }
                for (var _i4 = 1; _i4 < 6; _i4++) {
                    var a = "p" + _i4;
                    voteNums += Game.GameEnv.voteNums[a] + ",";
                }
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.VOTE_END,
                    outs: outs,
                    attentions: attentions,
                    voteNums: voteNums
                }), 0, GLB.playerUserIds);
            }, 6000);

            setTimeout(function () {
                mainFsm.toRoundFour();
            }, 10000);
        },
        onToRoundFour: function onToRoundFour() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundFour
                }), 0, GLB.playerUserIds);
            }
            if (Game.GameEnv.outPlayers.includes("p1")) {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {

                        playerFsm.endToPlayerFour();
                    } else {

                        playerFsm.endToPlayerThree();
                    }
                } else {

                    playerFsm.endToPlayerTwo();
                }
            } else {

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteThree: function onToVoteThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);
            }

            setTimeout(function () {
                Game.GameEnv.checkResult();
                var outs = "",
                    attentions = "",
                    voteNums = "";
                for (var i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                    outs += Game.GameEnv.outPlayers[i] + ",";
                }
                for (var _i5 = 0; _i5 < Game.GameEnv.attentionPlayers.length; _i5++) {
                    attentions += Game.GameEnv.attentionPlayers[_i5] + ",";
                }
                for (var _i6 = 1; _i6 < 6; _i6++) {
                    var a = "p" + _i6;
                    voteNums += Game.GameEnv.voteNums[a] + ",";
                }
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.VOTE_END,
                    outs: outs,
                    attentions: attentions,
                    voteNums: voteNums
                }), 0, GLB.playerUserIds);
            }, 6000);

            setTimeout(function () {
                mainFsm.toRoundFive();
            }, 10000);
        },
        onToRoundFive: function onToRoundFive() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundFive
                }), 0, GLB.playerUserIds);
            }
            if (Game.GameEnv.outPlayers.includes("p1")) {
                if (Game.GameEnv.outPlayers.includes("p2")) {
                    if (Game.GameEnv.outPlayers.includes("p3")) {

                        playerFsm.endToPlayerFour();
                    } else {

                        playerFsm.endToPlayerThree();
                    }
                } else {

                    playerFsm.endToPlayerTwo();
                }
            } else {

                playerFsm.endToPlayerOne();
            }
        },
        onToEnd: function onToEnd() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                var good = "",
                    bad = "";
                GLB.good.forEach(function (element) {
                    good += element + ",";
                });

                GLB.bad.forEach(function (element) {
                    bad += element + ",";
                });

                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundEnd,
                    good: good,
                    bad: bad
                }), 0, GLB.playerUserIds);
            }
        }
    }
});

var playerFsm = new StateMachine({
    init: 'turn_end',
    transitions: [{ name: 'endToPlayerOne', from: 'turn_end', to: 'state_player_one' }, { name: 'endToPlayerTwo', from: 'turn_end', to: 'state_player_two' }, { name: 'endToPlayerThree', from: 'turn_end', to: 'state_player_three' }, { name: 'endToPlayerFour', from: 'turn_end', to: 'state_player_four' }, { name: 'oneToPlayerTwo', from: 'state_player_one', to: 'state_player_two' }, { name: 'oneToPlayerThree', from: 'state_player_one', to: 'state_player_three' }, { name: 'oneToPlayerFour', from: 'state_player_one', to: 'state_player_four' }, { name: 'oneToPlayerFive', from: 'state_player_one', to: 'state_player_five' }, { name: 'twoToPlayerThree', from: 'state_player_two', to: 'state_player_three' }, { name: 'twoToPlayerFour', from: 'state_player_two', to: 'state_player_four' }, { name: 'twoToPlayerFive', from: 'state_player_two', to: 'state_player_five' }, { name: 'twoToPlayerEnd', from: 'state_player_two', to: 'turn_end' }, { name: 'threeToPlayerFour', from: 'state_player_three', to: 'state_player_four' }, { name: 'threeToPlayerFive', from: 'state_player_three', to: 'state_player_five' }, { name: 'threeToPlayerEnd', from: 'state_player_three', to: 'turn_end' }, { name: 'fourToPlayerFive', from: 'state_player_four', to: 'state_player_five' }, { name: 'fourToPlayerEnd', from: 'state_player_four', to: 'turn_end' }, { name: 'fiveToPlayerEnd', from: 'state_player_five', to: 'turn_end' }],
    methods: {
        onEndToPlayerOne: function onEndToPlayerOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[0],
                    number: 0
                }), 0, GLB.playerUserIds);

                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }

            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerTwo: function onEndToPlayerTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[1],
                    number: 1
                }), 0, GLB.playerUserIds);

                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }

            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerThree: function onEndToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);

                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }

            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerFour: function onEndToPlayerFour() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);

                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }

            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onOneToPlayerTwo: function onOneToPlayerTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[1],
                    number: 1
                }), 0, GLB.playerUserIds);

                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerThree() }, 2000);
        },
        onOneToPlayerThree: function onOneToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerFour() }, 2000);
        },
        onOneToPlayerFour: function onOneToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onOneToPlayerFive: function onOneToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },
        onTwoToPlayerThree: function onTwoToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerFour() }, 2000);
        },
        onTwoToPlayerFour: function onTwoToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onTwoToPlayerFive: function onTwoToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },
        onTwoToPlayerEnd: function onTwoToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(function () {
                    mainFsm.toRoundTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(function () {
                    mainFsm.toVoteOne();
                }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(function () {
                    mainFsm.toVoteTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(function () {
                    mainFsm.toVoteThree();
                }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(function () {
                    mainFsm.toEnd();
                }, 2000);
            }
        },
        onThreeToPlayerFour: function onThreeToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onThreeToPlayerFive: function onThreeToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },
        onThreeToPlayerEnd: function onThreeToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(function () {
                    mainFsm.toRoundTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(function () {
                    mainFsm.toVoteOne();
                }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(function () {
                    mainFsm.toVoteTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(function () {
                    mainFsm.toVoteThree();
                }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(function () {
                    mainFsm.toEnd();
                }, 2000);
            }
        },
        onFourToPlayerFive: function onFourToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(function () {
                    Game.BlockManager.sendUpdateBMsg();
                }, 500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },
        onFourToPlayerEnd: function onFourToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(function () {
                    mainFsm.toRoundTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(function () {
                    mainFsm.toVoteOne();
                }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(function () {
                    mainFsm.toVoteTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(function () {
                    mainFsm.toVoteThree();
                }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(function () {
                    mainFsm.toEnd();
                }, 2000);
            }
        },
        onFiveToPlayerEnd: function onFiveToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(function () {
                    mainFsm.toRoundTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(function () {
                    mainFsm.toVoteOne();
                }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(function () {
                    mainFsm.toVoteTwo();
                }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(function () {
                    mainFsm.toVoteThree();
                }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(function () {
                    mainFsm.toEnd();
                }, 2000);
            }
        }
    }
});

module.exports = {
    mainFsm: mainFsm,
    playerFsm: playerFsm
};

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
        //# sourceMappingURL=StateSystem.js.map
        