(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/script/basic/messenger/clientEvent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '771d9tmDfZB9b/EtuKXDtNa', 'clientEvent', __filename);
// scripts/common/script/basic/messenger/clientEvent.js

"use strict";

var _eventType;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.clientEvent = {
    eventType: (_eventType = {
        openUI: "openUI",
        closeUI: "closeUI",
        gameStart: "gameStart",
        gameOver: "gameOver",
        roundOver: "roundOver",
        roundStart: "roundStart",
        roundVote: "roundVote",
        endVote: "endVote",
        writeVote: "writeVote",
        playerDead: "playerDead",
        playerRound: "playerRound",
        time: "time",

        initResponse: "initResponse",
        errorResponse: "errorResponse",
        joinRoomResponse: "joinRoomResponse",
        joinRoomNotify: "joinRoomNotify",
        leaveRoomResponse: "leaveRoomResponse",
        leaveRoomNotify: "leaveRoomNotify",
        leaveRoomMedNotify: "leaveRoomMedNotify",

        joinOverResponse: "joinOverResponse",
        createRoomResponse: "createRoomResponse",
        getRoomListResponse: "getRoomListResponse",
        getRoomDetailResponse: "getRoomDetailResponse",
        getRoomListExResponse: "getRoomListExResponse",
        kickPlayerResponse: "kickPlayerResponse",
        kickPlayerNotify: "kickPlayerNotify",
        playerAccountGet: "playerAccountGet"
    }, _defineProperty(_eventType, "leaveRoomMedNotify", "leaveRoomMedNotify"), _defineProperty(_eventType, "levelChangeSync", "LevelChangeSync"), _defineProperty(_eventType, "levelUpdate", "levelUpdate"), _defineProperty(_eventType, "checkStart", "checkStart"), _eventType),
    eventListener: null
};

clientEvent.init = function () {
    clientEvent.eventListener = eventListener.create();
};

clientEvent.on = function (eventName, handler, target) {
    if (typeof eventName !== "string") {
        return;
    }
    clientEvent.eventListener.on(eventName, handler, target);
};

clientEvent.off = function (eventName, handler, target) {
    if (typeof eventName !== "string") {
        return;
    }
    clientEvent.eventListener.off(eventName, handler, target);
};

clientEvent.clear = function (target) {
    clientEvent.eventListener.clear(target);
};

clientEvent.dispatch = function (eventName, data) {
    if (typeof eventName !== "string") {
        return;
    }
    clientEvent.eventListener.dispatch(eventName, data);
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
        //# sourceMappingURL=clientEvent.js.map
        