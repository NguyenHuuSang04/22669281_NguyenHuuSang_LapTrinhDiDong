interface Movable {
    move(): void;
}

class Car_Bai29 implements Movable {
    move(): void {
        console.log(`Car move 100km/h`);
    }

}

class Robot_Bai29 implements Movable {
    move(): void {
        console.log(`Robot move 10km/h`);
    }
}

let car_Bai29 = new Car_Bai29();
let robot_Bai29 = new Robot_Bai29();

car_Bai29.move();
robot_Bai29.move();