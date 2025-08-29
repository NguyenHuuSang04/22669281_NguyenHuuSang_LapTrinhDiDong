import { Person } from "./Bai01";
export class Student extends Person {
    grade: number;

    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }



    displayInfo(): void {
        console.log(`Name: ${this.name}, age: ${this.age}, grade: ${this.grade}`);
    }
}

const student1 = new Student("A", 21, 9.0);
// student1.displayInfo();