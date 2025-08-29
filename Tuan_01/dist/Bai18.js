"use strict";
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        if (b === 0) {
            throw new Error("Không thể chia cho 0!!!");
        }
        return a / b;
    }
}
console.log(MathUtil.add(10, 5));
console.log(MathUtil.subtract(10, 5));
console.log(MathUtil.multiply(10, 5));
console.log(MathUtil.divide(10, 5));
