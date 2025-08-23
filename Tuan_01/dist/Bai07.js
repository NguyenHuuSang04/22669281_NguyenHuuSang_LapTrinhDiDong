"use strict";
class User {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
}
// test
const u1 = new User("Sang");
console.log(u1.name); // gọi name bằng getter
u1.name = "Aaa"; //setter đổi giá trị
console.log(u1.name);
