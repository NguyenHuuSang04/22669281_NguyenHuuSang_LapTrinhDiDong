"use strict";
function bai_15(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Done: ${num}`);
            resolve(num);
        }, 1000);
    });
}
async function run_bai15() {
    const r1 = await bai_15(1);
    const r2 = await bai_15(2);
    const r3 = await bai_15(3);
    console.log("Results: ", r1, r2, r3);
}
run_bai15();
