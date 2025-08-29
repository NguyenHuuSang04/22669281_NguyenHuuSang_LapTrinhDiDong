"use strict";
class Animal_Bai19 {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    set setName(v) {
        this.name = v;
    }
    sound() {
    }
}
class Dog_Bai19 extends Animal_Bai19 {
    sound() {
        console.log(`${this.getName} says: Woof!`);
    }
}
class Cat_Bai19 extends Animal_Bai19 {
    sound() {
        console.log(`${this.getName} says: Meow`);
    }
}
const dog_1 = new Dog_Bai19("A");
const cat_1 = new Cat_Bai19("B");
dog_1.sound();
cat_1.sound();
