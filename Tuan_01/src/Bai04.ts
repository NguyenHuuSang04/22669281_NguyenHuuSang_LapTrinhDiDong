class Rectangle {
    width : number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return ( this.width + this.height ) *2;
    }
}

const rectangle = new Rectangle(5, 9);
console.log(`Dien tich: ${rectangle.area()}`);
console.log(`Chu vi: ${rectangle.perimeter()}`);