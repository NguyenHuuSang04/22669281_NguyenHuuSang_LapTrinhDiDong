"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai_18_1 = require("./Bai_18");
async function fetchUsers(ids) {
    // cách 1: chạy song song 
    // const users = await Promise.all(ids.map(id => fetchUser(id)));
    // return users;
    // cách 2: chạy tuần tự
    const users = [];
    for (const id of ids) {
        const user = await (0, Bai_18_1.fetchUser)(id);
        users.push(user);
    }
    return users;
}
async function run_bai_19() {
    console.log("Fetching user...");
    const users = await fetchUsers([1, 2, 3, 4, 5]);
    console.log("User được fetch: ", users);
}
run_bai_19();
