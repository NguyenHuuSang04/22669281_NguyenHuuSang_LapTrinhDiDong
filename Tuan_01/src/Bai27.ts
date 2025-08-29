import { Person } from "./Bai01";

export class Teacher extends Person {
    subject: string;
    constructor(name: string, age: number, subject: string) {
        super(name, age);// gọi lại construct person
        this.subject = subject;
    }

    introduce(): void {
        console.log(`My name is ${this.name}, I am ${this.age} years old and I teach ${this.subject}.`);
    }
}

let teacher = new Teacher("A", 20, "English");
// teacher.introduce();