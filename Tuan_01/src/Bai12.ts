interface Flyable {
    fly(): void
}



interface Swimmable {
    swim(): void;
}

class Bird implements Flyable {

    fly(): void {
        console.log("Bird can fly")
    }
}

class Fish implements Swimmable {
    swim(): void {
        console.log("Fish can swim");
    }
}

let bird = new Bird();
let fish = new Fish();
bird.fly();
fish.swim();
