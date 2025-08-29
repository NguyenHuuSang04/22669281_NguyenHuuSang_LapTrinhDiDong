class Employee {
    private name: string;
    private age: number;
    private position: string;

    constructor(name: string, age: number, position: string) {
        this.name = name;
        this.age = age;
        this.position = position;
    }

    get getName(): string {
        return this.name;
    }

    public set setName(v: string) {
        this.name = v;
    }

    get getAge(): number {
        return this.age;
    }

    public set setAge(v: number) {
        this.age = v;
    }

    get getPosition(): string {
        return this.position;
    }

    public set setPosition(v: string) {
        this.position = v;
    }

    inforPosition(): void {
        console.log(`My name is ${this.name}, my position is ${this.position}`);
    }
}

class Manager extends Employee {
    holdMeeting(): void {
        console.log(`${this.getName} is holding a meeting.`);
    }
}

class Develop extends Employee {
    writeCode(): void {
        console.log(`${this.getName} is writing code.`);
    }
}

let manager = new Manager("Sang", 12, "manager");
let developer = new Develop("Sang", 12, "develop");

manager.inforPosition();
manager.holdMeeting();

developer.inforPosition();
developer.writeCode();