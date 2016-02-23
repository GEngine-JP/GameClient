function Hello<T>(args:T):T {
    return args;
}
//泛型类型（lamb表达式）
var myHello:<K>(arg:K)=>K = Hello;
alert(myHello("test"));

//泛型使用
var output = Hello<string>("hello xiaomo");
alert(output);

function Arr<T>(args:T[]):T[] {
    return args;
}
//泛型使用
var list:Array<string> = Arr<string>(["1", "2", "3"]);
for (var i = 0; i < list.length; i++) {
    alert(list[i]);
}

interface Test<T> {
    <T>(arg:T):T;
}

function myTest<T>(arg:T):T {
    return arg;
}
var mh:Test<string> = myTest;
alert(mh("xiaomo test"));


//泛型类
class HelloNumber<T> {

    zero:T;
    add:(x:T, y:T)=>T;
}
var myHelloNumber = new HelloNumber<number>();
myHelloNumber.zero = 0;
myHelloNumber.add = function (x, y) {
    return x + y;
}
alert(myHelloNumber.add(1, 2));
