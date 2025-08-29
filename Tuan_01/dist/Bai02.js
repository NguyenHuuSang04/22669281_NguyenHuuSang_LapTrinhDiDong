"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Bai01_1 = require("./Bai01");
class Student extends Bai01_1.Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, age: ${this.age}, grade: ${this.grade}`);
    }
}
exports.Student = Student;
const student1 = new Student("A", 21, 9.0);
// student1.displayInfo();
