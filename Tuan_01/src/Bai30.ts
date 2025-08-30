import { Student } from "./Bai02";
import { Teacher } from "./Bai27";

class School {
    teachers: Teacher[] = [];
    students: Student[] = [];

    constructor(teachers: Teacher[], students: Student[]) {
        this.teachers = teachers;
        this.students = students;
    }

    displayInfo(): void {
        console.log("=== School Info ===");
        console.log("Teachers:");
        this.teachers.forEach(t => t.introduce());

        console.log("Students:");
        this.students.forEach(s => s.displayInfo());
    }
}

let students: Student[] = [
    new Student("A", 12, 9.0),
    new Student("B", 15, 8.0),
    new Student("C", 19, 5.0),
]

let teachers: Teacher[] = [
    new Teacher("D", 25, "Math"),
    new Teacher("E", 30, "English"),
    new Teacher("F", 40, "History"),
]

let school = new School(teachers, students);
school.displayInfo();