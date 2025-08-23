"use strict";
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return (this.width + this.height) * 2;
    }
}
const rectangle = new Rectangle(5, 9);
console.log(`Dien tich: ${rectangle.area()}`);
console.log(`Chu vi: ${rectangle.perimeter()}`);
