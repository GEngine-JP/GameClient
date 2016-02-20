/**
 * Created by Administrator on 2016/2/20.
 */
//基本数据类型之可选属性
interface printValue {
    label?:string;
}
//方法
function printLabel(label:printValue) {
    alert(label.label);
}
var myObj = {label: "test"};
printLabel(myObj);
//----------输出：test-------------------

//方法接口
interface SearchFunc {
    (source:string, stbString:string):boolean;
}
//实现
var myFunc:SearchFunc;
myFunc = function (source:string, subString:string) {
    var result = source.search(subString);
    return result != -1;
};
alert(myFunc("xiaomo", "hupeng"));
//----------输出:false-------------------


//数组接口
interface StringArray {
    [index:number]:string;
}
var myArray:StringArray;
myArray = ['xiaomo', 'xiaoming'];
alert(myArray[1]);
//----------输出:xiaoming-------------------


//类接口
interface ClickInterface {
    currentTime:Date;
    setTime(d:Date);
}
class Clock implements ClickInterface {
    h:number;
    m:number;
    currentTime:Date;

    setTime(d:Date) {
        this.currentTime = d;
    }

    constructor(h:number, m:number) {
        this.h = h;
        this.m = m;
    }
}
var myClock = new Clock(1, 2);
myClock.setTime(new Date);
alert(myClock.currentTime);
//----------输出:当前时间-------------------

//接口继承
interface Shape {
    color:string;
    reset():void;
}

//继承
interface JuXing extends Shape {
    size:number;
}

//多继承
interface Circle extends Shape,JuXing {
    sideLength:number;
}
//使用
var s = <Circle>{};
s.color = "blue";
s.sideLength = 5;
s.reset();




