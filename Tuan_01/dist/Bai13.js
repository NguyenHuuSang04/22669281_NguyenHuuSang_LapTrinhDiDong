"use strict";
class Shape {
}
class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }
    area() {
        return this.length * this.length;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return this.radius * this.radius * Math.PI;
    }
}
let square = new Square(10);
let circle = new Circle(3);
console.log("Square area: " + square.area());
console.log("Circle area: " + circle.area());
