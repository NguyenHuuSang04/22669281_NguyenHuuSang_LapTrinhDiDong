"use strict";
class Bird {
    fly() {
        console.log("Bird can fly");
    }
}
class Fish {
    swim() {
        console.log("Fish can swim");
    }
}
let bird = new Bird();
let fish = new Fish();
bird.fly();
fish.swim();
