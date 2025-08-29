abstract class Appliance {
    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log("Turn on Fan");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Turn on Air Conditioner");
    }
}

//Test
let fan: Appliance = new Fan();
let air: Appliance = new AirConditioner();

fan.turnOn();
air.turnOn();