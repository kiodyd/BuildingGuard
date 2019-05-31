(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/script/basic/gameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '71befhMjOZLK4kQqOY4yNmZ', 'gameManager', __filename);
// scripts/common/script/basic/gameManager.js

"use strict";

var _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mvs = require("Matchvs");

cc.Class((_cc$Class = {
    extends: cc.Component,
    properties: {
        uiLogin: cc.Node,
        uiCreateRoom: cc.Node
    },

    blockInput: function blockInput() {
        Game.GameManager.getComponent(cc.BlockInputEvents).enabled = true;
        setTimeout(function () {
            Game.GameManager.node.getComponent(cc.BlockInputEvents).enabled = false;
        }, 1000);
    },
    onLoad: function onLoad() {
        Game.GameManager = this;
        cc.game.addPersistRootNode(this.node);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = 1;
        clientEvent.init();
        dataFunc.loadConfigs();
        cc.view.enableAutoFullScreen(false);
        this.rivalScore = 0;
        this.selfScore = 0;
        this.gameTime = 0;
        this.isRivalLeave = false;
        clientEvent.on(clientEvent.eventType.gameOver, this.gameOver, this);
        clientEvent.on(clientEvent.eventType.leaveRoomNotify, this.leaveRoom, this);
        clientEvent.on(clientEvent.eventType.joinRoomResponse, this.joinRoomResponseC, this);
        this.network = window.network;
        this.network.chooseNetworkMode();
        this.getRankDataListener();
        this.findPlayerByAccountListener();
    },


    joinRoomResponseC: function joinRoomResponseC(data) {
        if (data.status !== 200) {
            console.log('进入房间失败,异步回调错误码: ' + data.status);

            uiFunc.openUI("uiTip", function (obj) {
                var uiTip = obj.getComponent("uiTip");
                if (uiTip) {
                    uiTip.setData("当前所加入的房间不存在");
                }
            });
        } else {
            console.log('进入房间成功');
            console.log('房间号: ' + data.roomInfo.roomID);
            if (!data.roomUserInfoList.some(function (x) {
                return x.userId === GLB.userInfo.id;
            })) {
                data.roomUserInfoList.push({
                    userId: GLB.userInfo.id,
                    userProfile: ""
                });
            }
            // 设置房间最大人数--


            GLB.MAX_PLAYER_COUNT = 5;

            this.uiCreateRoom.active = true;
            var room = this.uiCreateRoom.getComponent('uiRoom');
            room.joinRoomInit(data.roomUserInfoList, data.roomInfo);

            this.node.active = false;
        }
    },

    leaveRoom: function leaveRoom(data) {
        if (this.gameState === GameState.Play) {
            if (data.leaveRoomInfo.userId !== GLB.userInfo.id) {
                this.isRivalLeave = true;
            }
            clientEvent.dispatch(clientEvent.eventType.leaveRoomMedNotify, data);
            this.gameOver();
        }
    },

    gameOver: function gameOver() {
        // 打开结算界面--
        var gamePanel = uiFunc.findUI("uiGamePanel");
        if (gamePanel && Game.GameManager.gameState !== GameState.Over) {
            Game.GameManager.gameState = GameState.Over;
            this.readyCnt = 0;
            setTimeout(function () {
                clientEvent.dispatch(clientEvent.eventType.gameOver);
            }.bind(this), 1500);
            setTimeout(function () {
                uiFunc.openUI("uiVsResult");
            }.bind(this), 3000);
        }
    },

    startGame: function startGame() {
        this.readyCnt = 0;
        this.gameState = GameState.None;
        this.rivalScore = 0;
        this.selfScore = 0;
        this.isRivalLeave = false;
        this.gameTime = GLB.gameTime;
        clearInterval(Game.GameManager.timeId);
        cc.director.loadScene('game_scene', function () {
            this.sendReadyMsg();
            // uiFunc.openUI("uiGamePanel", function () {
            //     this.sendReadyMsg();
            // }.bind(this));
        }.bind(this));

        if (GLB.syncFrame === true && GLB.isRoomOwner === true) {
            var result = mvs.engine.setFrameSync(GLB.FRAME_RATE);
            if (result !== 0) {
                console.log('设置帧同步率失败,错误码:' + result);
            }
        }
    },

    setFrameSyncResponse: function setFrameSyncResponse(rsp) {
        if (rsp.mStatus !== 200) {
            console.log('设置同步帧率失败，status=' + rsp.status);
        } else {
            console.log('设置同步帧率成功, 帧率为:' + GLB.FRAME_RATE);
        }
    },

    matchVsInit: function matchVsInit() {
        mvs.response.initResponse = this.initResponse.bind(this);
        mvs.response.errorResponse = this.errorResponse.bind(this);
        mvs.response.joinRoomResponse = this.joinRoomResponse.bind(this);
        mvs.response.joinRoomNotify = this.joinRoomNotify.bind(this);
        mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
        mvs.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
        mvs.response.joinOverResponse = this.joinOverResponse.bind(this);
        mvs.response.createRoomResponse = this.createRoomResponse.bind(this);
        mvs.response.getRoomListResponse = this.getRoomListResponse.bind(this);
        mvs.response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
        mvs.response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
        mvs.response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
        mvs.response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
        mvs.response.registerUserResponse = this.registerUserResponse.bind(this);
        mvs.response.loginResponse = this.loginResponse.bind(this); // 用户登录之后的回调
        mvs.response.logoutResponse = this.logoutResponse.bind(this); // 用户登录之后的回调
        mvs.response.sendEventNotify = this.sendEventNotify.bind(this);
        mvs.response.frameUpdate = this.frameUpdate.bind(this);
        mvs.response.setFrameSyncResponse = this.setFrameSyncResponse.bind(this);
        mvs.response.networkStateNotify = this.networkStateNotify.bind(this);

        //var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, GLB.gameId);
        var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, GLB.gameId, GLB.appKey, GLB.gameVersion);
        if (result !== 0) {
            console.log('初始化失败,错误码:' + result);
        }

        Game.GameManager.blockInput();
    },

    networkStateNotify: function networkStateNotify(netNotify) {
        console.log("netNotify");
        console.log("netNotify.owner:" + netNotify.owner);
        if (netNotify.userID !== GLB.userInfo.id) {
            GLB.isRoomOwner = true;
        }
        console.log("玩家：" + netNotify.userID + " state:" + netNotify.state);
        if (netNotify.userID !== GLB.userInfo.id) {
            this.isRivalLeave = true;
        }
        clientEvent.dispatch(clientEvent.eventType.leaveRoomMedNotify, netNotify);
        this.gameOver();
    },

    kickPlayerNotify: function kickPlayerNotify(_kickPlayerNotify) {
        var data = {
            kickPlayerNotify: _kickPlayerNotify
        };
        clientEvent.dispatch(clientEvent.eventType.kickPlayerNotify, data);
    },

    kickPlayerResponse: function kickPlayerResponse(kickPlayerRsp) {
        if (kickPlayerRsp.status !== 200) {
            console.log("失败kickPlayerRsp:" + kickPlayerRsp);
            return;
        }
        var data = {
            kickPlayerRsp: kickPlayerRsp
        };
        clientEvent.dispatch(clientEvent.eventType.kickPlayerResponse, data);
    },

    getRoomListExResponse: function getRoomListExResponse(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 rsp:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        };
        clientEvent.dispatch(clientEvent.eventType.getRoomListExResponse, data);
    },

    getRoomDetailResponse: function getRoomDetailResponse(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 rsp:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        };
        clientEvent.dispatch(clientEvent.eventType.getRoomDetailResponse, data);
    },

    getRoomListResponse: function getRoomListResponse(status, roomInfos) {
        if (status !== 200) {
            console.log("失败 status:" + status);
            return;
        }
        var data = {
            status: status,
            roomInfos: roomInfos
        };
        clientEvent.dispatch(clientEvent.eventType.getRoomListResponse, data);
    },

    createRoomResponse: function createRoomResponse(rsp) {
        if (rsp.status !== 200) {
            console.log("失败 createRoomResponse:" + rsp);
            return;
        }
        var data = {
            rsp: rsp
        };
        clientEvent.dispatch(clientEvent.eventType.createRoomResponse, data);
    },

    joinOverResponse: function joinOverResponse(joinOverRsp) {
        if (joinOverRsp.status !== 200) {
            console.log("失败 joinOverRsp:" + joinOverRsp);
            return;
        }
        var data = {
            joinOverRsp: joinOverRsp
        };
        clientEvent.dispatch(clientEvent.eventType.joinOverResponse, data);
    },

    joinRoomResponse: function joinRoomResponse(status, roomUserInfoList, roomInfo) {
        if (status !== 200) {
            console.log("失败 joinRoomResponse:" + status);
            return;
        }
        var data = {
            status: status,
            roomUserInfoList: roomUserInfoList,
            roomInfo: roomInfo
        };
        clientEvent.dispatch(clientEvent.eventType.joinRoomResponse, data);
    },

    joinRoomNotify: function joinRoomNotify(roomUserInfo) {
        var data = {
            roomUserInfo: roomUserInfo
        };
        clientEvent.dispatch(clientEvent.eventType.joinRoomNotify, data);
    },

    leaveRoomResponse: function leaveRoomResponse(leaveRoomRsp) {
        if (leaveRoomRsp.status !== 200) {
            console.log("失败 leaveRoomRsp:" + leaveRoomRsp);
            return;
        }
        var data = {
            leaveRoomRsp: leaveRoomRsp
        };
        clientEvent.dispatch(clientEvent.eventType.leaveRoomResponse, data);
    },

    leaveRoomNotify: function leaveRoomNotify(leaveRoomInfo) {
        var data = {
            leaveRoomInfo: leaveRoomInfo
        };
        clientEvent.dispatch(clientEvent.eventType.leaveRoomNotify, data);
    },

    logoutResponse: function logoutResponse(status) {
        Game.GameManager.network.disconnect();
        console.log("reload lobby");
        cc.game.removePersistRootNode(this.node);
        cc.director.loadScene('lobby');
    },

    errorResponse: function errorResponse(error, msg) {
        if (error === 1001 || error === 0) {
            uiFunc.openUI("uiTip", function (obj) {
                var uiTip = obj.getComponent("uiTip");
                if (uiTip) {
                    uiTip.setData("网络断开连接");
                }
            });
            setTimeout(function () {
                mvs.engine.logout("");
                cc.game.removePersistRootNode(this.node);
                cc.director.loadScene('lobby');
            }.bind(this), 2500);
        }
        console.log("错误信息：" + error);
        console.log("错误信息：" + msg);
    },

    initResponse: function initResponse() {
        console.log('初始化成功，开始注册用户');
        var result = mvs.engine.registerUser();
        if (result !== 0) {
            console.log('注册用户失败，错误码:' + result);
        } else {
            console.log('注册用户成功');
        }
    },

    registerUserResponse: function registerUserResponse(userInfo) {
        var deviceId = 'abcdef';
        var gatewayId = 0;
        GLB.userInfo = userInfo;

        console.log('开始登录,用户Id:' + userInfo.id);

        /*var result = mvs.engine.login(
            userInfo.id, userInfo.token,
            GLB.gameId, GLB.gameVersion,
            GLB.appKey, GLB.secret,
            deviceId, gatewayId
        );*/
        var result = mvs.engine.login(userInfo.id, userInfo.token, deviceId);
        if (result !== 0) {
            console.log('登录失败,错误码:' + result);
        }
    },

    loginResponse: function loginResponse(info) {
        if (info.status !== 200) {
            console.log('登录失败,异步回调错误码:' + info.status);
        } else {
            console.log('登录成功');
            if (GLB.canInvate) {
                //var res;

                // wx.getSetting({
                //     success(res) {
                //         if (!res.authSetting['scope.userInfo']) {
                //             wx.authorize({
                //                 scope: 'scope.userInfo',
                //                 success() {
                //                     console.log("success!");
                //                 }
                //             })
                //         }
                //     }
                // })

                // wx.getSetting({
                //     success(res) {
                //         if (res.authSetting['scope.userInfo']) {
                //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                //             wx.getUserInfo({
                //                 success(res) {
                //                     Game.GameManager.nickName = res.userInfo.nickName;
                //                     Game.GameManager.avatarUrl = res.userInfo.avatarUrl;
                //                 }
                //             })
                //         } else {
                //             console.log("还未授权");
                //         }
                //     }
                // })

                //Game.GameManager.loginServer();


                if (!Game.GameManager.network.isConnected()) {
                    Game.GameManager.network.connect(GLB.IP, GLB.PORT, function () {
                        Game.GameManager.network.send("connector.entryHandler.login", {
                            "account": GLB.userInfo.id + "",
                            "channel": "0",
                            "userName": Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + "",
                            "headIcon": Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : "-"
                        });
                    });
                }

                setTimeout(function () {
                    if (GLB.TestID) {
                        //测试使用
                        res = mvs.engine.joinRoom(GLB.TestID, "joinRoomSpecial");
                    } else if (window.wx) {

                        res = mvs.engine.joinRoom(wx.getLaunchOptionsSync().query.id, "joinRoomSpecial");
                    }
                    console.log(res);
                    if (res !== 0) {
                        uiFunc.openUI("uiTip", function (obj) {
                            var uiTip = obj.getComponent("uiTip");
                            if (uiTip) {
                                uiTip.setData("当前所加入的房间不存在");
                            }
                        });
                    }
                }, 1000);
            } else {

                this.lobbyShow();
            }
        }
    },

    lobbyShow: function lobbyShow() {
        clientEvent.on(clientEvent.eventType.createRoomResponse, this.createRoomResponse, this);

        Game.GameManager.blockInput();

        var create = new mvs.CreateRoomInfo();
        create.roomName = Game.GameManager.nickName + "的房间";
        GLB.MAX_PLAYER_COUNT = 5;
        create.maxPlayer = GLB.MAX_PLAYER_COUNT;
        create.mode = 0;
        create.canWatch = 0;
        create.visibility = 1;
        create.roomProperty = GLB.MAX_PLAYER_COUNT;
        var result = mvs.engine.createRoom(create, { maxPlayer: GLB.MAX_PLAYER_COUNT });

        if (result !== 0) {
            console.log('创建房间失败,错误码:' + result);
        }
    }

}, _defineProperty(_cc$Class, "createRoomResponse", function createRoomResponse(data) {
    var status = data.status;
    if (status !== 200) {
        console.log('创建房间失败,异步回调错误码: ' + status);
    } else {
        console.log('创建房间成功:' + JSON.stringify(data));
        console.log('房间号: ' + data.roomID);
        GLB.roomId = data.roomID;

        this.uiLogin.active = false;
        this.uiCreateRoom.active = true;

        var room = this.uiCreateRoom.getComponent('uiRoom');
        room.createRoomInit(data);
    }
}), _defineProperty(_cc$Class, "sendEventNotify", function sendEventNotify(info) {
    console.log(info);
    var cpProto = JSON.parse(info.cpProto);
    if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
        GLB.playerUserIds = [GLB.userInfo.id];
        var remoteUserIds = JSON.parse(info.cpProto).userIds;
        remoteUserIds.forEach(function (id) {
            if (GLB.userInfo.id !== id) {
                GLB.playerUserIds.push(id);
            }
        });

        //房主同步房间内每个人玩家列表顺序
        if (GLB.isRoomOwner) {
            var ids = "";
            for (var i = 0; i < GLB.playerUserIds.length; i++) {
                ids += GLB.playerUserIds[i] + ",";
            }
            mvs.engine.sendEvent(JSON.stringify({
                action: GLB.PLAYER_ROOM_SYNC,
                playerUserIds: ids
            }));
        }

        this.startGame();
    }

    if (info.cpProto.indexOf(GLB.GAME_OVER_EVENT) >= 0) {
        this.gameOver();
    }

    if (info.cpProto.indexOf(GLB.READY) >= 0) {
        this.readyCnt++;
        if (GLB.isRoomOwner && this.readyCnt >= GLB.playerUserIds.length) {
            this.sendRoundStartMsg();
        }
    }

    if (info.cpProto.indexOf(GLB.ROUND_START) >= 0) {
        setTimeout(function () {

            this.timeUpdate();
        }.bind(this), 2000);
        clientEvent.dispatch(clientEvent.eventType.roundStart);
    }

    if (info.cpProto.indexOf(GLB.ROUND_STATE) >= 0) {
        GLB.nowState = cpProto.state;
        GLB.nowPlayerId = null;
        GLB.nowPlayer = -1;

        if (cpProto.state === RoundState.RoundVote) {
            clientEvent.dispatch(clientEvent.eventType.roundVote);
        } else if (cpProto.state === RoundState.RoundEnd) {

            var good = cpProto.good;
            good = good.split(",");
            good.pop();
            GLB.good = good;

            var bad = cpProto.bad;
            bad = bad.split(",");
            bad.pop();
            GLB.bad = bad;

            console.log(GLB.good);
            console.log(GLB.bad);

            clientEvent.dispatch(clientEvent.eventType.gameOver);
        } else {
            Game.GameEnv.closeVote();
            uiFunc.openUI("uiTip", function (obj) {
                var uiTip = obj.getComponent("uiTip");
                if (uiTip) {
                    uiTip.setData("第" + GLB.nowState + "轮");
                }
            });
        }
    }

    if (info.cpProto.indexOf(GLB.NOW_PLAYER) >= 0) {
        GLB.nowPlayerId = cpProto.playerId;
        GLB.nowPlayer = cpProto.number;
        Game.GameEnv.currentPlayer();
    }

    if (info.cpProto.indexOf(GLB.PLAYER_READY) >= 0) {
        GLB.playerReady.push(String(cpProto.playerId));
        clientEvent.dispatch(clientEvent.eventType.checkStart);
    }

    if (info.cpProto.indexOf(GLB.PLAYER_Cancel_READY) >= 0) {
        var index = GLB.playerReady.indexOf(String(cpProto.playerId));
        if (index !== -1) {

            GLB.playerReady.splice(index, 1);
        }
    }

    if (info.cpProto.indexOf(GLB.PLAYER_SYNC) >= 0) {
        var _ids = cpProto.playerReadyIds;
        _ids = _ids.split(",");
        _ids.pop();
        GLB.playerReady = _ids;
    }

    if (info.cpProto.indexOf(GLB.PLAYER_ROOM_SYNC) >= 0) {
        var _ids2 = cpProto.playerUserIds;
        _ids2 = _ids2.split(",");
        _ids2.pop();
        GLB.playerUserIds = _ids2;
    }

    if (info.cpProto.indexOf(GLB.VOTE_ONE) >= 0) {
        clientEvent.dispatch(clientEvent.eventType.writeVote, cpProto.playerId);
    }

    if (info.cpProto.indexOf(GLB.VOTE_END) >= 0) {
        var outs = cpProto.outs;
        var attentions = cpProto.attentions;
        var voteNums = cpProto.voteNums;
        outs = outs.split(",");
        outs.pop();

        attentions = attentions.split(",");
        attentions.pop();

        voteNums = voteNums.split(",");
        voteNums.pop();
        Game.GameEnv.voteNums["p1"] = parseInt(voteNums[0]);
        Game.GameEnv.voteNums["p2"] = parseInt(voteNums[1]);
        Game.GameEnv.voteNums["p3"] = parseInt(voteNums[2]);
        Game.GameEnv.voteNums["p4"] = parseInt(voteNums[3]);
        Game.GameEnv.voteNums["p5"] = parseInt(voteNums[4]);

        Game.GameEnv.voteEnd(outs, attentions);
    }

    if (info.cpProto.indexOf(GLB.LEVEL_SYNC) >= 0) {
        GLB.levelIndex = cpProto.levelIndex;
        clientEvent.dispatch(clientEvent.eventType.levelUpdate);
    }

    if (info.cpProto.indexOf(GLB.CAMP) >= 0) {
        GLB.camp = cpProto.camp;
        switch (GLB.camp) {
            case 0:
                console.log("保卫者");
                break;
            case 1:
                console.log("破坏者");
                break;
            default:
                console.log("阵营分配错误");
        }
    }

    if (info.cpProto.indexOf(GLB.NEED_UP) >= 0) {
        Game.BlockManager.checkNeed(cpProto.playerId);
    }
}), _defineProperty(_cc$Class, "sendReadyMsg", function sendReadyMsg() {
    var msg = { action: GLB.READY };
    this.sendEventEx(msg);
}), _defineProperty(_cc$Class, "sendRoundStartMsg", function sendRoundStartMsg() {
    var msg = { action: GLB.ROUND_START };
    this.sendEventEx(msg);
}), _defineProperty(_cc$Class, "frameUpdate", function frameUpdate(rsp) {
    for (var i = 0; i < rsp.frameItems.length; i++) {
        if (Game.GameManager.gameState === GameState.Over) {
            return;
        }
        var info = rsp.frameItems[i];
        var cpProto = JSON.parse(info.cpProto);
        if (info.cpProto.indexOf(GLB.DIRECTION) >= 0) {
            var block = Game.BlockManager.currentBlock.getComponent("block");
            if (GLB.userInfo.id === info.srcUserID) {
                block.setDirect(cpProto.direction);
            } else {
                block.setDirect(cpProto.direction);
            }
        }

        // if (info.cpProto.indexOf(GLB.FIRE_ANIM) >= 0) {
        //     if (GLB.userInfo.id === info.srcUserID) {
        //         Game.PlayerManager.self.firePreAnim();
        //     } else {
        //         Game.PlayerManager.rival.firePreAnim();
        //     }
        // }

        // if (info.cpProto.indexOf(GLB.FIRE_EVENT) >= 0) {
        //     if (GLB.userInfo.id === info.srcUserID) {
        //         Game.PlayerManager.self.fireNotify(cpProto.speed);
        //     } else {
        //         Game.PlayerManager.rival.fireNotify(cpProto.speed);
        //     }
        // }

        if (info.cpProto.indexOf(GLB.GAME_TIME) >= 0) {
            this.gameTime--;
            if (this.gameTime < 0) {
                this.gameTime = 0;
            }
        }

        if (info.cpProto.indexOf(GLB.UPDATE_B) >= 0) {
            Game.BlockManager.setNeedUp();
            Game.BlockManager.setIndex(cpProto.Index, cpProto.NextIndex);

            //Game.BlockManager.setNowPlayerId(cpProto.ID);
        }

        // if (info.cpProto.indexOf(GLB.GOAL_EVENT) >= 0) {
        //     // cpProto.playerId 为受伤方id--
        //     if (GLB.userInfo.id === cpProto.playerId) {
        //         Game.PlayerManager.self.hitNotify();
        //         this.rivalScore++;
        //     } else {
        //         Game.PlayerManager.rival.hitNotify();
        //         this.selfScore++;
        //     }
        //     clientEvent.dispatch(clientEvent.eventType.score);
        // }
    }

    if (Game.BlockManager) {
        // if (Math.abs(Game.PlayerManager.self.targetPosX - Game.PlayerManager.rival.targetPosX) < GLB.playerMinDistance) {
        //     if (Game.PlayerManager.self.targetPosX < Game.PlayerManager.rival.targetPosX) {
        //         Game.PlayerManager.self.targetPosX -= GLB.bounceDistance;
        //         Game.PlayerManager.rival.targetPosX += GLB.bounceDistance;
        //     } else {
        //         Game.PlayerManager.self.targetPosX += GLB.bounceDistance;
        //         Game.PlayerManager.rival.targetPosX -= GLB.bounceDistance;
        //     }
        // }

        Game.BlockManager.makeBlock();
        if (Game.BlockManager.currentBlock) {
            Game.BlockManager.currentBlock.getComponent("block").move();
        }

        //Game.PlayerManager.rival.move();
    }
}), _defineProperty(_cc$Class, "timeUpdate", function timeUpdate() {
    clearInterval(Game.GameManager.timeId);
    Game.GameManager.timeId = setInterval(function () {
        if (!this || !this.node) {
            return;
        }
        if (GLB.isRoomOwner) {
            if (Game.GameManager.gameTime <= 0 || Game.GameManager.gameState === GameState.Over) {
                clearInterval(Game.GameManager.timeId);
                Game.GameManager.sendEventEx({ action: GLB.GAME_OVER_EVENT });
            } else {
                mvs.engine.sendFrameEvent(JSON.stringify({
                    action: GLB.GAME_TIME
                }));
            }
        } else {
            if (Game.GameManager.gameTime <= 0 || Game.GameManager.gameState === GameState.Over) {
                clearInterval(Game.GameManager.timeId);
            }
        }
    }.bind(this), 1000);
}), _defineProperty(_cc$Class, "getRankDataListener", function getRankDataListener() {
    this.network.on("connector.rankHandler.getRankData", function (recvMsg) {
        uiFunc.openUI("uiRankPanelVer", function (obj) {
            var uiRankPanel = obj.getComponent("uiRankPanel");
            uiRankPanel.setData(recvMsg.rankArray);
        });
    }.bind(this));
}), _defineProperty(_cc$Class, "findPlayerByAccountListener", function findPlayerByAccountListener() {
    this.network.on("connector.entryHandler.findPlayerByAccount", function (recvMsg) {
        clientEvent.dispatch(clientEvent.eventType.playerAccountGet, recvMsg);
    });
}), _defineProperty(_cc$Class, "loginServer", function loginServer() {
    if (!this.network.isConnected()) {
        this.network.connect(GLB.IP, GLB.PORT, function () {
            this.network.send("connector.entryHandler.login", {
                "account": GLB.userInfo.id + "",
                "channel": "0",
                "userName": Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + "",
                "headIcon": Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : "-"
            });
            setTimeout(function () {
                this.network.send("connector.rankHandler.updateScore", {
                    "account": GLB.userInfo.id + "",
                    "game": GLB.GAME_NAME
                });
            }.bind(this), 500);
        }.bind(this));
    } else {
        this.network.send("connector.rankHandler.updateScore", {
            "account": GLB.userInfo.id + "",
            "game": GLB.GAME_NAME
        });
    }
}), _defineProperty(_cc$Class, "userInfoReq", function userInfoReq(userId) {
    if (!Game.GameManager.network.isConnected()) {
        Game.GameManager.network.connect(GLB.IP, GLB.PORT, function () {
            Game.GameManager.network.send("connector.entryHandler.login", {
                "account": GLB.userInfo.id + "",
                "channel": "0",
                "userName": Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + "",
                "headIcon": Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : "-"
            });
            setTimeout(function () {
                Game.GameManager.network.send("connector.entryHandler.findPlayerByAccount", {
                    "account": userId + ""
                });
            }, 200);
        });
    } else {
        Game.GameManager.network.send("connector.entryHandler.findPlayerByAccount", {
            "account": userId + ""
        });
    }
}), _defineProperty(_cc$Class, "sendEventEx", function sendEventEx(msg) {
    var result = mvs.engine.sendEventEx(0, JSON.stringify(msg), 0, GLB.playerUserIds);
    if (result.result !== 0) {
        console.log(msg.action, result.result);
    }
}), _cc$Class));

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
        //# sourceMappingURL=gameManager.js.map
        