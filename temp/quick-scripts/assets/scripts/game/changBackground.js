(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/changBackground.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '21cee7I18NFI4nyMQvttScx', 'changBackground', __filename);
// scripts/game/changBackground.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        anim_fade: {
            type: cc.Animation,
            default: null
        },
        Wireframe1: cc.Node,
        Wireframe2: cc.Node,
        judgeProcess: cc.Sprite,
        collider: cc.Sprite
    },

    onLoad: function onLoad() {
        var _this = this;

        var thisprite = this.node.getComponent(cc.Sprite); //获得自身组件sprite
        var wiresprite1 = this.Wireframe1.getComponent(cc.Sprite);
        var wiresprite2 = this.Wireframe2.getComponent(cc.Sprite);
        switch (GLB.levelIndex) {
            case 1:
                {
                    //为背景1的时候，加载背景1
                    cc.loader.loadRes('texture/background1', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        thisprite.spriteFrame = ret;
                    }.bind(this));

                    //加载线框图
                    cc.loader.loadRes('texture/line1', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        wiresprite1.spriteFrame = ret;
                        wiresprite2.spriteFrame = ret;
                    }.bind(this));

                    //加载完成度对比图
                    cc.loader.loadRes('texture/c1', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.judgeProcess.spriteFrame = ret;
                    }.bind(this));

                    //加载地形底座
                    cc.loader.loadRes('texture/g1', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.collider.spriteFrame = ret;
                    }.bind(this));

                    break;
                }
            case 2:
                {
                    //为背景2的时候，加载背景2
                    cc.loader.loadRes('texture/background2', cc.SpriteFrame, function (err, spriteFrame) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        thisprite.spriteFrame = spriteFrame;
                    }.bind(this));

                    //加载线框图
                    cc.loader.loadRes('texture/line2', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        wiresprite1.spriteFrame = ret;
                        wiresprite2.spriteFrame = ret;
                    }.bind(this));

                    //加载完成度对比图
                    cc.loader.loadRes('texture/c2', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.judgeProcess.spriteFrame = ret;
                    }.bind(this));

                    //加载地形底座
                    cc.loader.loadRes('texture/g2', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.collider.spriteFrame = ret;
                    }.bind(this));

                    break;
                }
            case 3:
                {
                    //为背景3的时候，加载背景3
                    cc.loader.loadRes('texture/background3', cc.SpriteFrame, function (err, spriteFrame) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        thisprite.spriteFrame = spriteFrame;
                    }.bind(this));

                    //加载线框图
                    cc.loader.loadRes('texture/line3', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        wiresprite1.spriteFrame = ret;
                        wiresprite2.spriteFrame = ret;
                    }.bind(this));

                    //加载完成度对比图
                    cc.loader.loadRes('texture/c3', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.judgeProcess.spriteFrame = ret;
                    }.bind(this));

                    //加载地形底座
                    cc.loader.loadRes('texture/g3', cc.SpriteFrame, function (err, ret) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        this.collider.spriteFrame = ret;
                    }.bind(this));

                    break;
                }
            default:
                {
                    console.log("noBackground");
                    break;
                }
        }

        setTimeout(function () {
            _this.anim_fade.node.active = true; //渐变激活
            _this.anim_fade.play(); //渐变播放
        }, 200);
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=changBackground.js.map
        