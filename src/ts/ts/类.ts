/**
 * Created by Administrator on 2016/2/20.
 */
/**
 * 人
 */
class Person {
    public name:string;
    public age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    tell() {
        return this.name + ":" + this.age;
    }
}
var p = new Person("xiaomo", 25);
alert(p.tell());


/**
 * 学生类
 */
class Student extends Person {
    public school:string;

    tell() {
        return this.name + ":" + this.age + ":" + this.school;
    }

    constructor(school:string) {
        this.school = school;
        super("xiaomo", 35);
    }
}
var student = new Student("战争学院");
alert(student.tell());

/**
 * 教师类
 * 封装 get/set
 */
class Teacher extends Person {
    private _school:string;
    get school():string {
        return this._school;
    }

    set school(school:string) {
        if (school == null) {
            alert("请输入学校");
        } else {
            this._school = school;
        }
    }
}

var t = new Teacher("xiaomo", 26);
//这里调不出 school属性，因为它的私有的
//使用 get/set方法 之后可以使用
//t.school = "战争学院";
alert(t.school);