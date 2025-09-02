"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai_21_1 = require("./Bai_21");
async function runMultipleCalls() {
    console.log("Bắt đầu gọi API nhiều lần");
    for (let i = 0; i <= 3; i++) {
        console.log(`\n Lần gọi thứ ${i}`);
        const users = await (0, Bai_21_1.fetchUsersFromAPI)();
        console.log(users);
    }
}
runMultipleCalls();
