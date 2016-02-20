var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Administrator on 2016/2/20.
 */
/**
 * 人
 */
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.tell = function () {
        return this.name + ":" + this.age;
    };
    return Person;
})();
var p = new Person("xiaomo", 25);
alert(p.tell());
/**
 * 学生类
 */
var Student = (function (_super) {
    __extends(Student, _super);
    function Student(school) {
        this.school = school;
        _super.call(this, "xiaomo", 35);
    }
    Student.prototype.tell = function () {
        return this.name + ":" + this.age + ":" + this.school;
    };
    return Student;
})(Person);
var student = new Student("战争学院");
alert(student.tell());
/**
 * 教师类
 * 封装 get/set
 */
var Teacher = (function (_super) {
    __extends(Teacher, _super);
    function Teacher() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Teacher.prototype, "school", {
        get: function () {
            return this._school;
        },
        set: function (school) {
            if (school == null) {
                alert("请输入学校");
            }
            else {
                this._school = school;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Teacher;
})(Person);
var t = new Teacher("xiaomo", 26);
//这里调不出 school属性，因为它的私有的
//使用 get/set方法 之后可以使用
//t.school = "战争学院";
alert(t.school);
//# sourceMappingURL=类.js.map