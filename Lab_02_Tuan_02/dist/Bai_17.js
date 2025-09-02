"use strict";
function delay(ms, value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
}
async function run_bai_17() {
    const promises = [
        delay(2000, 1), // xong sau 2s
        delay(1000, 2), // xong sau 1s
        delay(1500, 3), // xong sau 1.5s
    ];
    for await (const element of promises) {
        console.log(element);
    }
}
run_bai_17();
