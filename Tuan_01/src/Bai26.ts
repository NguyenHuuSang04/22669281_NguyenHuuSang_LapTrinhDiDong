import { Product } from "./Bai08";

class Order {
    products: Product[] = [];

    constructor(products: Product[]) {
        this.products = products;

    }

    calculateTotalPrice(): number {
        let total = 0;
        this.products.forEach(p => {
            total += p.price;
        });

        return total;
    }
}

let products: Product[] = [
    new Product("A", 10),
    new Product("B", 101),
    new Product("C", 102),
    new Product("D", 130),
]
let orderProduct = new Order(products);

console.log(`Total price: ${orderProduct.calculateTotalPrice()}`);