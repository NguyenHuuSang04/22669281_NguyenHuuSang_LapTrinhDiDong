"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = fetchUser;
// fectchUser: giả lập gọi API, trả về use sau 1s
async function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User_${id}` });
        }, 1000);
    });
}
// test
async function run_bai_18() {
    console.log("Fetching user...");
    const user = await fetchUser(1);
    console.log("User được fetch: ", user);
}
// run_bai_18();
