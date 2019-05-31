var mvs = require("Matchvs");
var StateMachine = require("state-machine.min");
var mainFsm = new StateMachine({
    init: 'state_start',
    transitions: [
        { name: 'toRoundOne', from: 'state_start', to: 'state_round_one' },
        { name: 'toRoundTwo', from: 'state_round_one', to: 'state_round_two' },
        { name: 'toVoteOne', from: 'state_round_two', to: 'state_vote_one' },
        { name: 'toRoundThree', from: 'state_vote_one', to: 'state_round_three' },
        { name: 'toVoteTwo', from: 'state_round_three', to: 'state_vote_two' },
        { name: 'toRoundFour', from: 'state_vote_two', to: 'state_round_four' },
        { name: 'toVoteThree', from: 'state_round_four', to: 'state_vote_three' },
        { name: 'toRoundFive', from: 'state_vote_three', to: 'state_round_five' },
        { name: 'toEnd', from: 'state_round_five', to: 'state_end' }
    ],
    methods: {
        onToRoundOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundOne
                }), 0, GLB.playerUserIds);
            }
            
            if(Game.GameEnv.outPlayers.includes("p1")){
                if(Game.GameEnv.outPlayers.includes("p2")){
                    if(Game.GameEnv.outPlayers.includes("p3")){
                        
                        playerFsm.endToPlayerFour();
                        
                    }else{

                        playerFsm.endToPlayerThree();
                    }
                }else{

                    playerFsm.endToPlayerTwo();
                }
            }else{

                playerFsm.endToPlayerOne();
            }
        },
        onToRoundTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundTwo
                }), 0, GLB.playerUserIds);
            }
            if(Game.GameEnv.outPlayers.includes("p1")){
                if(Game.GameEnv.outPlayers.includes("p2")){
                    if(Game.GameEnv.outPlayers.includes("p3")){
                        
                        playerFsm.endToPlayerFour();
                        
                    }else{

                        playerFsm.endToPlayerThree();
                    }
                }else{

                    playerFsm.endToPlayerTwo();
                }
            }else{

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);

                setTimeout(function () {

                    Game.GameEnv.checkResult();
                    let outs = "",attentions = "",voteNums = "";
                    for (let i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                        outs += (Game.GameEnv.outPlayers[i] + ",");
                    }
                    for (let i = 0; i < Game.GameEnv.attentionPlayers.length; i++) {
                        attentions += (Game.GameEnv.attentionPlayers[i] + ",");
                    }
                    for (let i = 1; i < 6; i++) {
                        let a = "p" + i;
                        voteNums += (Game.GameEnv.voteNums[a] + ",");
                    }
                    mvs.engine.sendEventEx(0, JSON.stringify({
                        action: GLB.VOTE_END,
                        outs: outs,
                        attentions: attentions,
                        voteNums:voteNums,
                    }), 0, GLB.playerUserIds);
                }, 6000);
            }
            setTimeout(() => { mainFsm.toRoundThree() }, 10000);
        },

        onToRoundThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundThree
                }), 0, GLB.playerUserIds);
            }
            if(Game.GameEnv.outPlayers.includes("p1")){
                if(Game.GameEnv.outPlayers.includes("p2")){
                    if(Game.GameEnv.outPlayers.includes("p3")){
                        
                        playerFsm.endToPlayerFour();
                        
                    }else{

                        playerFsm.endToPlayerThree();
                    }
                }else{

                    playerFsm.endToPlayerTwo();
                }
            }else{

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);
            }

            setTimeout(function () {
                Game.GameEnv.checkResult();
                let outs = "",attentions = "",voteNums = "";
                for (let i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                    outs += (Game.GameEnv.outPlayers[i] + ",");
                }
                for (let i = 0; i < Game.GameEnv.attentionPlayers.length; i++) {
                    attentions += (Game.GameEnv.attentionPlayers[i] + ",");
                }
                for (let i = 1; i < 6; i++) {
                    let a = "p" + i;
                    voteNums += (Game.GameEnv.voteNums[a] + ",");
                }
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.VOTE_END,
                    outs: outs,
                    attentions: attentions,
                    voteNums:voteNums,
                }), 0, GLB.playerUserIds);
            }, 6000);

            setTimeout(() => { mainFsm.toRoundFour() }, 10000);
        },

        onToRoundFour() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundFour
                }), 0, GLB.playerUserIds);
            }
            if(Game.GameEnv.outPlayers.includes("p1")){
                if(Game.GameEnv.outPlayers.includes("p2")){
                    if(Game.GameEnv.outPlayers.includes("p3")){
                        
                        playerFsm.endToPlayerFour();
                        
                    }else{

                        playerFsm.endToPlayerThree();
                    }
                }else{

                    playerFsm.endToPlayerTwo();
                }
            }else{

                playerFsm.endToPlayerOne();
            }
        },
        onToVoteThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundVote
                }), 0, GLB.playerUserIds);
            }

            setTimeout(function () {
                Game.GameEnv.checkResult();
                let outs = "",attentions = "",voteNums = "";
                for (let i = 0; i < Game.GameEnv.outPlayers.length; i++) {
                    outs += (Game.GameEnv.outPlayers[i] + ",");
                }
                for (let i = 0; i < Game.GameEnv.attentionPlayers.length; i++) {
                    attentions += (Game.GameEnv.attentionPlayers[i] + ",");
                }
                for (let i = 1; i < 6; i++) {
                    let a = "p" + i;
                    voteNums += (Game.GameEnv.voteNums[a] + ",");
                }
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.VOTE_END,
                    outs: outs,
                    attentions: attentions,
                    voteNums:voteNums
                }), 0, GLB.playerUserIds);
            }, 6000);

            setTimeout(() => { mainFsm.toRoundFive() }, 10000);
        },

        onToRoundFive() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundFive
                }), 0, GLB.playerUserIds);
            }
            if(Game.GameEnv.outPlayers.includes("p1")){
                if(Game.GameEnv.outPlayers.includes("p2")){
                    if(Game.GameEnv.outPlayers.includes("p3")){
                        
                        playerFsm.endToPlayerFour();
                        
                    }else{

                        playerFsm.endToPlayerThree();
                    }
                }else{

                    playerFsm.endToPlayerTwo();
                }
            }else{

                playerFsm.endToPlayerOne();
            }
        },
        onToEnd() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                var good = "",bad = "";
                GLB.good.forEach(element => {
                    good += (element + ",");
                });

                GLB.bad.forEach(element => {
                    bad += (element + ",");
                });

                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.ROUND_STATE,
                    state: RoundState.RoundEnd,
                    good:good,
                    bad:bad
                }), 0, GLB.playerUserIds);
            }
        }
    }
});

var playerFsm = new StateMachine({
    init: 'turn_end',
    transitions: [

        { name: 'endToPlayerOne', from: 'turn_end', to: 'state_player_one' },
        { name: 'endToPlayerTwo', from: 'turn_end', to: 'state_player_two' },
        { name: 'endToPlayerThree', from: 'turn_end', to: 'state_player_three' },
        { name: 'endToPlayerFour', from: 'turn_end', to: 'state_player_four' },

        { name: 'oneToPlayerTwo', from: 'state_player_one', to: 'state_player_two' },
        { name: 'oneToPlayerThree', from: 'state_player_one', to: 'state_player_three' },
        { name: 'oneToPlayerFour', from: 'state_player_one', to: 'state_player_four' },
        { name: 'oneToPlayerFive', from: 'state_player_one', to: 'state_player_five' },

        
        { name: 'twoToPlayerThree', from: 'state_player_two', to: 'state_player_three' },
        { name: 'twoToPlayerFour', from: 'state_player_two', to: 'state_player_four' },
        { name: 'twoToPlayerFive', from: 'state_player_two', to: 'state_player_five' },
        { name: 'twoToPlayerEnd', from: 'state_player_two', to: 'turn_end' },


        { name: 'threeToPlayerFour', from: 'state_player_three', to: 'state_player_four' },
        { name: 'threeToPlayerFive', from: 'state_player_three', to: 'state_player_five' },
        { name: 'threeToPlayerEnd', from: 'state_player_three', to: 'turn_end' },

        { name: 'fourToPlayerFive', from: 'state_player_four', to: 'state_player_five' },
        { name: 'fourToPlayerEnd', from: 'state_player_four', to: 'turn_end' },

        
        { name: 'fiveToPlayerEnd', from: 'state_player_five', to: 'turn_end' },

    ],
    methods: {
        onEndToPlayerOne() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[0],
                    number: 0
                }), 0, GLB.playerUserIds);

                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
                
            }

            
            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[1],
                    number: 1
                }), 0, GLB.playerUserIds);

                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
                
            }

            
            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);

                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
                
            }

            
            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },
        onEndToPlayerFour() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);

                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
                
            }

            
            //setTimeout(() => { playerFsm.toPlayerTwo() }, 2000);
        },



        onOneToPlayerTwo() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[1],
                    number: 1
                }), 0, GLB.playerUserIds);

                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerThree() }, 2000);
        },
        onOneToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerFour() }, 2000);
        },
        onOneToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onOneToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },






        onTwoToPlayerThree() {
            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[2],
                    number: 2
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerFour() }, 2000);
        },
        onTwoToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onTwoToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },

        onTwoToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(() => { mainFsm.toRoundTwo() }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(() => { mainFsm.toVoteOne() }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(() => { mainFsm.toVoteTwo() }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(() => { mainFsm.toVoteThree() }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(() => { mainFsm.toEnd() }, 2000);
            }

        },


        onThreeToPlayerFour() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[3],
                    number: 3
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toPlayerFive() }, 2000);
        },
        onThreeToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },

        onThreeToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(() => { mainFsm.toRoundTwo() }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(() => { mainFsm.toVoteOne() }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(() => { mainFsm.toVoteTwo() }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(() => { mainFsm.toVoteThree() }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(() => { mainFsm.toEnd() }, 2000);
            }

        },


        onFourToPlayerFive() {

            if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
                mvs.engine.sendEventEx(0, JSON.stringify({
                    action: GLB.NOW_PLAYER,
                    playerId: GLB.playerUserIds[4],
                    number: 4
                }), 0, GLB.playerUserIds);
                setTimeout(()=>{Game.BlockManager.sendUpdateBMsg();},500);
            }
            //setTimeout(() => { playerFsm.toTurnEnd() }, 2000);
        },

        onFourToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(() => { mainFsm.toRoundTwo() }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(() => { mainFsm.toVoteOne() }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(() => { mainFsm.toVoteTwo() }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(() => { mainFsm.toVoteThree() }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(() => { mainFsm.toEnd() }, 2000);
            }

        },

        onFiveToPlayerEnd() {

            if (mainFsm.is('state_round_one')) {
                setTimeout(() => { mainFsm.toRoundTwo() }, 2000);
            }
            if (mainFsm.is('state_round_two')) {
                setTimeout(() => { mainFsm.toVoteOne() }, 2000);
            }
            if (mainFsm.is('state_round_three')) {
                setTimeout(() => { mainFsm.toVoteTwo() }, 2000);
            }
            if (mainFsm.is('state_round_four')) {
                setTimeout(() => { mainFsm.toVoteThree() }, 2000);
            }
            if (mainFsm.is('state_round_five')) {
                setTimeout(() => { mainFsm.toEnd() }, 2000);
            }

        },

    }
});


module.exports = {
    mainFsm: mainFsm,
    playerFsm: playerFsm
};
