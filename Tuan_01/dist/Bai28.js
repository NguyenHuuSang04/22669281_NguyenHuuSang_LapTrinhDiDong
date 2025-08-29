"use strict";
class Animal_Bai28 {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    set setName(v) {
        this.name = v;
    }
    makeSound() { }
}
class Dog_Bai28 extends Animal_Bai28 {
    makeSound() {
        console.log("Dog says: Woof");
    }
    speak() {
        this.makeSound();
    }
}
class Cat_Bai28 extends Animal_Bai28 {
    makeSound() {
        console.log("Cat says: Meow");
    }
    speak() {
        this.makeSound();
    }
}
let dog_Bai28 = new Dog_Bai28("A");
let cat_Bai28 = new Cat_Bai28("B");
dog_Bai28.speak();
cat_Bai28.speak();
