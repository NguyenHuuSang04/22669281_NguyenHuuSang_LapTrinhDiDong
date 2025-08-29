"use strict";
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
//test
const numberBox = new Box(123);
console.log(numberBox.getValue());
numberBox.setValue(456);
console.log(`Sau khi set: ${numberBox.getValue()}`);
