(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/getCosine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60f8fvmk0FGP6ZmZ9OE+cD2', 'getCosine', __filename);
// scripts/game/getCosine.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textureIdMapRenderTexture = {};
var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    property = _cc$_decorator.property;

var ScreenCaptureWindow = ccclass(_class = function (_cc$Component) {
    _inherits(ScreenCaptureWindow, _cc$Component);

    function ScreenCaptureWindow() {
        _classCallCheck(this, ScreenCaptureWindow);

        return _possibleConstructorReturn(this, (ScreenCaptureWindow.__proto__ || Object.getPrototypeOf(ScreenCaptureWindow)).apply(this, arguments));
    }

    _createClass(ScreenCaptureWindow, [{
        key: 'capture',
        value: function capture() {

            //需要再创建一个 Camera ，depth要高于MainCamera 不然会黑屏 
            var camera = cc.find('Canvas/Camera').getComponent(cc.Camera);
            var texture = new cc.RenderTexture();
            texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
            //cc.TEXTURE2_D_PIXEL_FORMAT_RGB_A8888,0x88F0
            camera.targetTexture = texture;
            this.texture = texture;

            this.width = this.texture.width;
            this.height = this.texture.height;

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = this.width;
            canvas.height = this.height;

            camera.render();
            var data = this.texture.readPixels();

            /////////////////////////////////////////////////////////////////////////////////////////////////
            //截图的直方图
            var originData2 = data;
            var grayData2 = this.gray(originData2);
            var histogramData2 = this.getHistogram(grayData2);

            //原图的直方图
            var histogramData = global_arr.orgArr;

            //求相似度
            this.cosine(histogramData, histogramData2);
            return this.cosine(histogramData, histogramData2);
            /////////////////////////////////////////////////////////////////////////////////////////////////
        }
    }, {
        key: 'gray',
        value: function gray(imgData) {
            //计算灰度
            var data = imgData;

            for (var i = 0, len = data.length; i < len; i += 4) {
                var gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i + 2] = data[i + 1] = data[i] = gray;
                // console.log("gray[i]="+gray);
            }
            // cc.log( "grayData", imgData);
            return imgData;
        }
    }, {
        key: 'getdiff',
        value: function getdiff(gray_data) {
            //计算每行像素平均值
            var avglist = [];
            var hrzData = [];

            for (var i = 0; i < this.height; i++) {
                //计算第i行的平均值，录入avglist
                var hrz = 0;

                for (var j = 0; j < this.width; j++) {
                    //第i行总值
                    hrz += gray_data[i * this.width + j];
                }

                hrzData.push(hrz);
                var avg = hrzData[i] / this.width; //第i行的平均值
                avglist.push(avg);
            }
            // cc.log( "diffData", avglist);
            return avglist;
        }
    }, {
        key: 'getss',
        value: function getss(avglist) {
            //计算方差

            var avg = this.arraySum(avglist) / avglist.length; //计算平均值
            cc.log("avgData", avg);
            var ss = 0; //方差初始值

            cc.log("avglist.length", avglist.length);
            for (var i = 0; i < avglist.length; i++) {
                //计算方差
                ss += Math.pow(avglist[i] - avg, 2) / avglist.length;
                // cc.log( "avglist[i]", avglist[i]);
                // cc.log( "ss", ss);
            }

            cc.log("ssData", ss);
            return ss;
        }
    }, {
        key: 'getImgData',
        value: function getImgData(spriteFrame) {
            //获取图片像素
            // let spriteFrame = sprite.spriteFrame
            if (spriteFrame == null) {
                return false;
            }

            var rect = spriteFrame.getRect(); //图片实际位置与长款
            this.rect = rect;

            console.log("rect", rect);

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
        }
    }, {
        key: 'arraySum',
        value: function arraySum(array) {
            //数组求和算法
            var total = 0;
            var len = array.length;
            for (var i = 0; i < len; i++) {
                total += array[i];
            }
            // cc.log( "arraySumData", total);
            return total;
        }

        //得直方图

    }, {
        key: 'getHistogram',
        value: function getHistogram(imageData) {
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
        }

        //得相似度

    }, {
        key: 'cosine',
        value: function cosine(arr1, arr2) {
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
    }]);

    return ScreenCaptureWindow;
}(cc.Component)) || _class;

exports.default = ScreenCaptureWindow;
module.exports = exports['default'];

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
        //# sourceMappingURL=getCosine.js.map
        