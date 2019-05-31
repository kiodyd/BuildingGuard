(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/common/script/uiLogin.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fb82d5Sr/1JnZbeK/r8ui/t', 'uiLogin', __filename);
// scripts/common/script/uiLogin.js

'use strict';

var uiPanel = require("uiPanel");
cc.Class({
    extends: uiPanel,
    properties: {
        startPosition: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
    },
    start: function start() {

        if (window.wx) {

            wx.getSetting({
                success: function success(res) {
                    if (!res.authSetting['scope.userInfo']) {
                        wx.authorize({
                            scope: 'scope.userInfo',
                            success: function success() {
                                console.log("success!");
                                wx.getUserInfo({
                                    success: function success(res) {
                                        console.log(res);
                                        //此时可进行登录操作
                                        Game.GameManager.nickName = res.userInfo.nickName;
                                        Game.GameManager.avatarUrl = res.userInfo.avatarUrl;

                                        var id = wx.getLaunchOptionsSync().query.id;
                                        console.log(id);
                                        if (GLB.canInvate && id != undefined) {
                                            uiFunc.openUI("uiTip", function (obj) {
                                                var uiTip = obj.getComponent("uiTip");
                                                if (uiTip) {
                                                    uiTip.setData("正在进入游戏中，请稍等...");
                                                }
                                            });
                                            Game.GameManager.matchVsInit();
                                        }
                                    },
                                    fail: function fail() {

                                        console.log("拒绝收取");
                                        uiFunc.openUI("uiTip", function (obj) {
                                            var uiTip = obj.getComponent("uiTip");
                                            if (uiTip) {
                                                uiTip.setData("请您授权微信信息");
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function fail() {

                                console.log("拒绝收取");
                                uiFunc.openUI("uiTip", function (obj) {
                                    var uiTip = obj.getComponent("uiTip");
                                    if (uiTip) {
                                        uiTip.setData("请您授权微信信息");
                                    }
                                });
                            }
                        });
                    } else {
                        wx.getUserInfo({
                            success: function success(res) {
                                console.log(res);
                                //此时可进行登录操作
                                Game.GameManager.nickName = res.userInfo.nickName;
                                Game.GameManager.avatarUrl = res.userInfo.avatarUrl;

                                var id = wx.getLaunchOptionsSync().query.id;
                                console.log(id);
                                if (GLB.canInvate && id != undefined) {

                                    uiFunc.openUI("uiTip", function (obj) {
                                        var uiTip = obj.getComponent("uiTip");
                                        if (uiTip) {
                                            uiTip.setData("正在进入游戏中，请稍等...");
                                        }
                                    });
                                    Game.GameManager.matchVsInit();
                                }
                            },
                            fail: function fail() {

                                console.log("拒绝收取");
                                uiFunc.openUI("uiTip", function (obj) {
                                    var uiTip = obj.getComponent("uiTip");
                                    if (uiTip) {
                                        uiTip.setData("请您授权微信信息");
                                    }
                                });
                            }
                        });
                    }
                }
            });

            //this.nodeDict["start"].active = false;
            this.nodeDict["start"].on("click", function () {
                if (Game.GameManager.isClickCd) {
                    return;
                }
                Game.GameManager.isClickCd = true;
                setTimeout(function () {
                    Game.GameManager.isClickCd = false;
                }, 1000);

                var target = this.nodeDict["start"];
                createjs.Tween.get(target).to({ x: 0 }, 200);
                createjs.Tween.get(target).to({ y: 0 }, 200);

                setTimeout(function () {
                    //this.nodeDict['help'].active = true;


                    // wx.getSetting({
                    //     success(res) {
                    //         if (res.authSetting['scope.userInfo']) {
                    //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    //             wx.getUserInfo({
                    //                 success(res) {

                    //                 }
                    //             })
                    //         } else {
                    //             console.log("还未授权");
                    //         }
                    //     }
                    // })

                    GLB.canInvate = false;
                    Game.GameManager.matchVsInit();
                }, 100);
            }, this);
        } else {

            //this.nodeDict['help'].active = true;
            this.nodeDict["start"].on("click", function () {
                var target = this.nodeDict["start"];
                createjs.Tween.get(target).to({ x: 0 }, 200);
                createjs.Tween.get(target).to({ y: 0 }, 200);

                setTimeout(function () {
                    GLB.canInvate = false;
                    Game.GameManager.matchVsInit();
                }, 200);
            }, this);
        }
    },
    onEnable: function onEnable() {
        if (Game.GameManager.getUserInfoBtn) {
            Game.GameManager.getUserInfoBtn.show();
        }
    },
    onDisable: function onDisable() {
        if (Game.GameManager.getUserInfoBtn) {
            Game.GameManager.getUserInfoBtn.hide();
        }
        clientEvent.off(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
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
        //# sourceMappingURL=uiLogin.js.map
        