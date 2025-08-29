class Animal_Bai28 {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public get getName(): string {
        return this.name;
    }

    public set setName(v: string) {
        this.name = v;
    }

    protected makeSound(): void { }
}

class Dog_Bai28 extends Animal_Bai28 {
    protected makeSound(): void {
        console.log("Dog says: Woof");
    }

    public speak(): void {
        this.makeSound();
    }
}

class Cat_Bai28 extends Animal_Bai28 {
    protected makeSound(): void {
        console.log("Cat says: Meow");
    }

    public speak(): void {
        this.makeSound();
    }
}
let dog_Bai28 = new Dog_Bai28("A");
let cat_Bai28 = new Cat_Bai28("B");

dog_Bai28.speak();
cat_Bai28.speak();
