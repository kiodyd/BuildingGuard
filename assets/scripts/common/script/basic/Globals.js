window.Game = {
    GameManager: null,
    BlockManager: null,
    GameEnv: null,
    
}

window.GameState = cc.Enum({
    None: 0,
    Pause: 1,
    Play: 2,
    Over: 3,
    End: 4
})

window.DirectState = cc.Enum({
    None: 0,
    Left: 1,
    Right: 2,
    Down: 3,
    Change: 4
})

window.RoundState = cc.Enum({
    RoundStart: 0,
    RoundOne: 1,
    RoundTwo: 2,
    RoundThree: 3,
    RoundFour: 4,
    RoundFive: 5,
    RoundVote: 7,
    RoundEnd: 8

})

window.GLB = {
    RANDOM_MATCH: 1,
    PROPERTY_MATCH: 2,
    COOPERATION: 1,
    COMPETITION: 2,
    MAX_PLAYER_COUNT: 5,
    PLAYER_COUNTS: [5],
    

    GAME_START_EVENT: "gameStart",
    GAME_OVER_EVENT: "gameOver",
    READY: "ready",
    PLAYER_READY: "playerReady",
    PLAYER_Cancel_READY:"playerCancelReady",
    PLAYER_SYNC:"playerSync", // 给新加入的玩家同步信息
    PLAYER_ROOM_SYNC:"playerRoomSync",// 同步房主信息给其他玩家
    ROUND_START: "roundStar",
    TOUCH_EVENT: "touch_event",
    DIRECTION: "direction",
    GAME_TIME: "game_time",
    UPDATE_B: "update_b",
    ROUND_STATE: "roundState",
    NOW_PLAYER: "nowPlayer",
    VOTE_ONE: "voteOne",
    VOTE_END: "voteEnd",
    LEVEL_SYNC:"levelSync",
    CAMP:"camp",
    NEED_UP:"needUp",

    channel: 'MatchVS',
    platform: 'alpha',
    gameId: 215290,
    gameVersion: 1,
    IP: "wxrank.matchvs.com",
    PORT: "3010",
    GAME_NAME: "game6",
    appKey: 'c1302ecf022440d59ec51d0cbbcd761a#C',
    secret: '8592a884560a4fc2a3bad15e3a4456a1',

    gameTime: 360,

    levelIndex:1,  //地图关卡
    canInvate:true,
    matchType: 1,
    gameType: 2,
    userInfo: null,
    playerUserIds: [],
    playerReady:[],
    isRoomOwner: false,
    nowState:RoundState.RoundStart,
    nowPlayer: -1,
    nowPlayerId: null,
    good:[],
    bad:[],

    syncFrame: true,
    FRAME_RATE: 10,

    NormalBulletSpeed: 1000,
    limitX: 505
}

