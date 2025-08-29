class Animal_Bai19 {
    private name: string;

    constructor(name: string) {
        this.name = name
    }

    public get getName(): string {
        return this.name;
    }

    public set setName(v: string) {
        this.name = v;
    }

    public sound(): void { }
}

class Dog_Bai19 extends Animal_Bai19 {
    public sound(): void {
        console.log(`${this.getName} says: Woof!`);
    }
}

class Cat_Bai19 extends Animal_Bai19 {
    public sound(): void {
        console.log(`${this.getName} says: Meow`);
    }
}

const dog_1 = new Dog_Bai19("A");
const cat_1 = new Cat_Bai19("B");

dog_1.sound();
cat_1.sound();
