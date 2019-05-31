var uiPanel = require("uiPanel");
cc.Class({
    extends: uiPanel,
    properties: {
        startPosition: cc.Node
    },

    onLoad() {
        this._super();


    },

    start() {


        if (window.wx) {


            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.userInfo']) {
                        wx.authorize({
                            scope: 'scope.userInfo',
                            success() {
                                console.log("success!");
                                wx.getUserInfo({
                                    success(res) {
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
                                    fail() {

                                        console.log("拒绝收取")
                                        uiFunc.openUI("uiTip", function (obj) {
                                            var uiTip = obj.getComponent("uiTip");
                                            if (uiTip) {
                                                uiTip.setData("请您授权微信信息");
                                            }
                                        });
                                    },

                                });
                            },

                            fail() {

                                console.log("拒绝收取")
                                uiFunc.openUI("uiTip", function (obj) {
                                    var uiTip = obj.getComponent("uiTip");
                                    if (uiTip) {
                                        uiTip.setData("请您授权微信信息");
                                    }
                                });
                            },
                        })
                    } else {
                        wx.getUserInfo({
                            success(res) {
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

                            fail() {

                                console.log("拒绝收取")
                                uiFunc.openUI("uiTip", function (obj) {
                                    var uiTip = obj.getComponent("uiTip");
                                    if (uiTip) {
                                        uiTip.setData("请您授权微信信息");
                                    }
                                });
                            },
                        });
                    }
                }
            })



            //this.nodeDict["start"].active = false;
            this.nodeDict["start"].on("click", function () {
                if (Game.GameManager.isClickCd) {
                    return;
                }
                Game.GameManager.isClickCd = true;
                setTimeout(function () {
                    Game.GameManager.isClickCd = false;
                }, 1000);


                

                var target = this.nodeDict["start"]
                createjs.Tween.get(target).to({ x: 0 }, 200);
                createjs.Tween.get(target).to({ y: 0 }, 200);


                setTimeout(() => {
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
                }, 100)


            }, this);
        } else {

            //this.nodeDict['help'].active = true;
            this.nodeDict["start"].on("click", function () {
                var target = this.nodeDict["start"]
                createjs.Tween.get(target).to({ x: 0 }, 200);
                createjs.Tween.get(target).to({ y: 0 }, 200);

                setTimeout(() => {
                    GLB.canInvate = false;
                    Game.GameManager.matchVsInit();
                }, 200);
            }, this);


        }
    },



    onEnable() {
        if (Game.GameManager.getUserInfoBtn) {
            Game.GameManager.getUserInfoBtn.show();
        }
    },

    onDisable() {
        if (Game.GameManager.getUserInfoBtn) {
            Game.GameManager.getUserInfoBtn.hide();
        }
        clientEvent.off(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    }
});
