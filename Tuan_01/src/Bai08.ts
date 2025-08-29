export class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}


const products: Product[] = [
    new Product("A", 10),
    new Product("B", 101),
    new Product("C", 102),
    new Product("D", 130),
    new Product("E", 10),
    new Product("F", 11),
    new Product("G", 12),
    new Product("H", 13),
    new Product("I", 190),
    new Product("K", 100),
    new Product("L", 106),
]

const proFilter = products.filter(p => p.price > 100);
// console.log(proFilter)