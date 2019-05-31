"use strict";
cc._RF.push(module, '6fbe7Eg2EZFg6BrPvQbjpPW', 'getss');
// scripts/game/getss.js

"use strict";

var _textureIdMapRenderTexture = {};

window.global_arr = {
    orgArr: null
};

cc.Class({
    extends: cc.Component,

    properties: {
        sprite1: {
            type: cc.Sprite,
            default: null
        },
        sprite2: {
            type: cc.Sprite,
            default: null
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node._getImgData = this.getImgData.bind(this);
    },
    start: function start() {
        // this.main1(this.sprite1.spriteFrame)
        // this.main1(this.sprite2.spriteFrame)

        global_arr.orgArr = this.main2(this.sprite1.spriteFrame); //背景原图的直方图-》global

        //测试用
        this.cosine(this.main2(this.sprite1.spriteFrame), this.main2(this.sprite2.spriteFrame));
    },


    //方法1  方差
    main1: function main1(spriteFrame) {
        //选择sprite执行
        var originData = this.getImgData(spriteFrame);
        var grayData = this.gray(originData);
        var diffData = this.getdiff(grayData);
        var ssData = this.getss(diffData);
        this.onDestroy(spriteFrame);
    },


    //方法2  相似度
    main2: function main2(spriteFrame) {
        //选择sprite执行
        var originData = this.getImgData(spriteFrame);
        var grayData = this.gray(originData);
        var histogramData = this.getHistogram(grayData);
        return histogramData;
    },


    //////////////////////////////////////////////////////////////////////////////////////
    gray: function gray(imgData) {
        //计算灰度
        var data = imgData;

        for (var i = 0, len = data.length; i < len; i += 4) {
            var gray = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
            data[i + 2] = data[i + 1] = data[i] = gray;
        }
        // cc.log( "grayData", imgData);
        return imgData;
    },
    getdiff: function getdiff(gray_data) {
        //计算每行像素平均值
        var avglist = [];
        var hrzData = [];

        for (var i = 0; i < this.rect.height; i++) {
            //计算第i行的平均值，录入avglist
            var hrz = 0;

            for (var j = 0; j < this.rect.width; j++) {
                //第i行总值
                hrz += gray_data[i * this.rect.width + j];
            }

            hrzData.push(hrz);
            var avg = hrzData[i] / this.rect.width; //第i行的平均值
            avglist.push(avg);
        }
        // cc.log( "diffData", avglist);
        return avglist;
    },
    getss: function getss(avglist) {
        //计算方差

        var avg = this.arraySum(avglist) / avglist.length; //计算平均值
        // cc.log( "avgData", avg);
        var ss = 0; //方差初始值

        // cc.log( "avglist.length", avglist.length);
        for (var i = 0; i < avglist.length; i++) {
            //计算方差
            ss += Math.pow(avglist[i] - avg, 2) / avglist.length;
            // cc.log( "avglist[i]", avglist[i]);

            // cc.log( "ss", ss);
        }

        cc.log("ssData", ss);
        return ss;
    },
    getImgData: function getImgData(spriteFrame) {
        //获取图片像素
        // let spriteFrame = sprite.spriteFrame
        if (spriteFrame == null) {
            return false;
        }

        var rect = spriteFrame.getRect(); //图片实际位置与长款
        this.rect = rect;

        // console.log( "rect", rect)

        var tex = spriteFrame.getTexture();
        var rt = _textureIdMapRenderTexture[tex.getId()];

        // RenderTexure方式
        if (!rt) {
            rt = new cc.RenderTexture();
            rt.initWithSize(tex.width, tex.height);
            rt.drawTextureAt(tex, 0, 0);
            _textureIdMapRenderTexture[tex.getId()] = rt;
            // console.log("rt!=null");
        } else {}
            // console.log("rt=null");


            // data就是这个texture的rgba值数组
        var data = void 0;
        data = rt.readPixels(data, 1, 1, rect.width - 1, rect.height - 1);
        // cc.log( "originData", data)
        return data;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    onDestroy: function onDestroy(spriteFrame) {
        // let spriteFrame = sprite.spriteFrame
        if (spriteFrame == null) {
            return false;
        }

        var tex = spriteFrame.getTexture();
        var id = tex.getId();
        if (_textureIdMapRenderTexture[id]) {
            _textureIdMapRenderTexture[id].destroy();
            delete _textureIdMapRenderTexture[id];
            // console.log("destroy:"+sprite.node.name);
        }
    },
    arraySum: function arraySum(array) {
        //数组求和算法
        var total = 0;
        var len = array.length;
        for (var i = 0; i < len; i++) {
            total += array[i];
        }
        // cc.log( "arraySumData", total);
        return total;
    },


    //得直方图
    getHistogram: function getHistogram(imageData) {
        var arr = [];
        for (var i = 0; i < 64; i++) {
            arr[i] = 0;
        }

        var pow4 = Math.pow(4, 2);
        for (var i = 0, len = imageData.length; i < len; i += 4) {
            var red = imageData[i] / 64 | 0;
            var green = imageData[i + 1] / 64 | 0;
            var blue = imageData[i + 2] / 64 | 0;
            var index = red * pow4 + green * 4 + blue;
            arr[index]++;
        }
        // console.log("histogramData=",arr);
        return arr;
    },


    //得相似度
    cosine: function cosine(arr1, arr2) {
        var axb = 0,
            a = 0,
            b = 0;
        for (var i = 0, len = arr1.length; i < len; i++) {
            axb += arr1[i] * arr2[i];
            a += arr1[i] * arr1[i];
            b += arr2[i] * arr2[i];
        }
        console.log("cosine=" + axb / (Math.sqrt(a) * Math.sqrt(b)));
        return axb / (Math.sqrt(a) * Math.sqrt(b));
    }
    // update (dt) {},

});

cc._RF.pop();