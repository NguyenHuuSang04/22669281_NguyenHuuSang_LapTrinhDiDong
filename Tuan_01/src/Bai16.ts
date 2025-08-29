class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }


    public getValue(): T {
        return this.value;
    }

    public setValue(value: T): void {
        this.value = value;
    }
}

//test
const numberBox = new Box<number>(123);
console.log(numberBox.getValue());

numberBox.setValue(456);
console.log(`Sau khi set: ${numberBox.getValue()}`)