"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai08_1 = require("./Bai08");
class Order {
    constructor(products) {
        this.products = [];
        this.products = products;
    }
    calculateTotalPrice() {
        let total = 0;
        this.products.forEach(p => {
            total += p.price;
        });
        return total;
    }
}
let products = [
    new Bai08_1.Product("A", 10),
    new Bai08_1.Product("B", 101),
    new Bai08_1.Product("C", 102),
    new Bai08_1.Product("D", 130),
];
let orderProduct = new Order(products);
console.log(`Total price: ${orderProduct.calculateTotalPrice()}`);
