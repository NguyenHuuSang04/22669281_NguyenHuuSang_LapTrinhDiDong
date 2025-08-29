export class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

// test
// const u1 = new User("Sang");
// console.log(u1.getName()); // gọi name bằng getter

// u1.setName("Aaa"); //setter đổi giá trị
// console.log(u1.getName());
