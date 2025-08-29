"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const Bai01_1 = require("./Bai01");
class Teacher extends Bai01_1.Person {
    constructor(name, age, subject) {
        super(name, age); // gọi lại construct person
        this.subject = subject;
    }
    introduce() {
        console.log(`My name is ${this.name}, I am ${this.age} years old and I teach ${this.subject}.`);
    }
}
exports.Teacher = Teacher;
let teacher = new Teacher("A", 20, "English");
// teacher.introduce();
