"use strict";
class Employee {
    constructor(name, age, position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
    get getName() {
        return this.name;
    }
    set setName(v) {
        this.name = v;
    }
    get getAge() {
        return this.age;
    }
    set setAge(v) {
        this.age = v;
    }
    get getPosition() {
        return this.position;
    }
    set setPosition(v) {
        this.position = v;
    }
    inforPosition() {
        console.log(`My name is ${this.name}, my position is ${this.position}`);
    }
}
class Manager extends Employee {
    holdMeeting() {
        console.log(`${this.getName} is holding a meeting.`);
    }
}
class Develop extends Employee {
    writeCode() {
        console.log(`${this.getName} is writing code.`);
    }
}
let manager = new Manager("Sang", 12, "manager");
let developer = new Develop("Sang", 12, "develop");
manager.inforPosition();
manager.holdMeeting();
developer.inforPosition();
developer.writeCode();
