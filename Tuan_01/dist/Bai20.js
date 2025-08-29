"use strict";
class Car_Bai20 {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    infor() {
        console.log("This is car");
    }
}
class Bike {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    infor() {
        console.log("This is Bike");
    }
}
const car = new Car_Bai20("A");
const bike = new Bike("B");
car.infor();
bike.infor();
