abstract class Shape {
    abstract area(): number;
}

class Square extends Shape {
    length: number;
    constructor(length: number) {
        super();
        this.length = length;
    }
    area(): number {
        return this.length * this.length;
    }
}

class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    area(): number {
        return this.radius * this.radius * Math.PI;
    }
}
let square = new Square(10);
let circle = new Circle(3);

console.log("Square area: " + square.area());
console.log("Circle area: " + circle.area());
