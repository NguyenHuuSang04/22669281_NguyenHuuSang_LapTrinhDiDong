class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCar(): void{
        console.log(`Brand: ${this.brand}, model: ${this.model}, year: ${this.year}`);
    }
}

const car01 = new Car("Honda", "H001", 2025);
car01.showCar();