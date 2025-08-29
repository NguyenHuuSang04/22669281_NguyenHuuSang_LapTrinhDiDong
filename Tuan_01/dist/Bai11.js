"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    bark() {
        console.log(`${this.name} is barking: Woof!`);
    }
}
class Cat extends Animal {
    meow() {
        console.log(`${this.name} is meowing: Meow!`);
    }
}
const dog = new Dog("Dog 1");
const cat = new Cat("Cat 1");
console.log(dog.name);
dog.bark();
console.log(cat.name);
cat.meow();
