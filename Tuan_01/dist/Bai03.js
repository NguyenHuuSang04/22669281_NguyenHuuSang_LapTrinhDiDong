"use strict";
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showCar() {
        console.log(`Brand: ${this.brand}, model: ${this.model}, year: ${this.year}`);
    }
}
const car01 = new Car("Honda", "H001", 2025);
car01.showCar();
