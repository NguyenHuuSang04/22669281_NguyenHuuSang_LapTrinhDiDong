"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
exports.User = User;
// test
// const u1 = new User("Sang");
// console.log(u1.getName()); // gọi name bằng getter
// u1.setName("Aaa"); //setter đổi giá trị
// console.log(u1.getName());
