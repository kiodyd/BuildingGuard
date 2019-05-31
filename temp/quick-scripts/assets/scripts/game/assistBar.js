(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/assistBar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a25dgKFrlI540xXphByaix', 'assistBar', __filename);
// scripts/assistBar.js

"use strict";

//用于控制辅助条的位置
cc.Class({
    extends: cc.Component,

    properties: {},

    // onLoad () {},

    onLoad: function onLoad() {
        this.activeNode = null;
        this.world = this.node.parent;
        this.node.active = false;
    },
    startAssist: function startAssist() {
        //获取当前控制的方块   
        if (Game.BlockManager.currentBlock) {

            this.activeNode = Game.BlockManager.currentBlock;
        }
    },
    update: function update(dt) {
        //调整辅助条的位置和宽度
        if (this.activeNode != null) {

            this.node.x = this.activeNode.x;
            this.node.width = (this.activeNode.rotation / 90 % 2 ? this.activeNode.height : this.activeNode.width) - 10;
            //this.node.rotation = this.activeNode.rotation;

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
        //# sourceMappingURL=assistBar.js.map
        