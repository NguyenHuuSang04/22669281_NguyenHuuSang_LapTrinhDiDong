"use strict";
function calculate_Bai29(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Task ${num} done`);
            resolve(num * 2);
        }, 1000);
    });
}
async function queueProcess() {
    const nums = [1, 2, 3, 4, 5];
    const results = [];
    for (const n of nums) {
        const result = await calculate_Bai29(n); // chờ task hiện tại xong mới qua task mới
        results.push(result);
    }
    console.log("Kết quả cuối cùng: ", results);
}
queueProcess();
