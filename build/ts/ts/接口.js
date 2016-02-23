//方法
function printLabel(label) {
    alert(label.label);
}
var myObj = { label: "test" };
printLabel(myObj);
//实现
var myFunc;
myFunc = function (source, subString) {
    var result = source.search(subString);
    return result != -1;
};
alert(myFunc("xiaomo", "hupeng"));
var myArray;
myArray = ['xiaomo', 'xiaoming'];
alert(myArray[1]);
var Clock = (function () {
    function Clock(h, m) {
        this.h = h;
        this.m = m;
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
})();
var myClock = new Clock(1, 2);
myClock.setTime(new Date);
alert(myClock.currentTime);
//使用
var s = {};
s.color = "blue";
s.sideLength = 5;
s.reset();
//# sourceMappingURL=接口.js.map