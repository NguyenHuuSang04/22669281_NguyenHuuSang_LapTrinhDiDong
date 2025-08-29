interface Vehicle {
    infor(): void;
}

class Car_Bai20 implements Vehicle {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public get getName(): string {
        return this.name;
    }

    infor(): void {
        console.log("This is car");
    }
}

class Bike implements Vehicle {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }


    public get getName(): string {
        return this.name;
    }

    infor(): void {
        console.log("This is Bike");
    }
}

const car = new Car_Bai20("A");
const bike = new Bike("B");

car.infor();
bike.infor();
