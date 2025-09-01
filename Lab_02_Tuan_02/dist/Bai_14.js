"use strict";
function calculate(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
}
async function run_Bai14(num) {
    const result = await calculate(num);
    console.log(result);
}
run_Bai14(4);
