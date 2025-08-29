"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai02_1 = require("./Bai02");
const Bai27_1 = require("./Bai27");
class School {
    constructor(teachers, students) {
        this.teachers = [];
        this.students = [];
        this.teachers = teachers;
        this.students = students;
    }
    displayInfo() {
        console.log("=== School Info ===");
        console.log("Teachers:");
        this.teachers.forEach(t => t.introduce());
        console.log("Students:");
        this.students.forEach(s => s.displayInfo());
    }
}
let students = [
    new Bai02_1.Student("A", 12, 9.0),
    new Bai02_1.Student("B", 15, 8.0),
    new Bai02_1.Student("C", 19, 5.0),
];
let teachers = [
    new Bai27_1.Teacher("D", 25, "Math"),
    new Bai27_1.Teacher("E", 30, "English"),
    new Bai27_1.Teacher("F", 40, "History"),
];
let school = new School(teachers, students);
school.displayInfo();
