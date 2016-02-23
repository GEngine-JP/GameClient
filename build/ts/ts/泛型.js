function Hello(args) {
    return args;
}
//泛型类型（lamb表达式）
var myHello = Hello;
alert(myHello("test"));
//泛型使用
var output = Hello("hello xiaomo");
alert(output);
function Arr(args) {
    return args;
}
//泛型使用
var list = Arr(["1", "2", "3"]);
for (var i = 0; i < list.length; i++) {
    alert(list[i]);
}
function myTest(arg) {
    return arg;
}
var mh = myTest;
alert(mh("xiaomo test"));
//泛型类
var HelloNumber = (function () {
    function HelloNumber() {
    }
    return HelloNumber;
})();
var myHelloNumber = new HelloNumber();
myHelloNumber.zero = 0;
myHelloNumber.add = function (x, y) {
    return x + y;
};
alert(myHelloNumber.add(1, 2));
//# sourceMappingURL=泛型.js.map