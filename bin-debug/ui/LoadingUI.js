var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.textField = new egret.TextField();
        _this.addChild(_this.textField);
        _this.textField.x = _this.textField.y = 200;
        _this.textField.text = 'loading...';
        return _this;
    }
    LoadingUI.prototype.onProgress = function (current, total) {
        //ES6的字符串语法
        this.textField.text = current + " / " + total;
        console.log(current, total);
    };
    return LoadingUI;
}(egret.DisplayObjectContainer));
__reflect(LoadingUI.prototype, "LoadingUI");
