"use strict";
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("Turn on Fan");
    }
}
class AirConditioner extends Appliance {
    turnOn() {
        console.log("Turn on Air Conditioner");
    }
}
//Test
let fan = new Fan();
let air = new AirConditioner();
fan.turnOn();
air.turnOn();
