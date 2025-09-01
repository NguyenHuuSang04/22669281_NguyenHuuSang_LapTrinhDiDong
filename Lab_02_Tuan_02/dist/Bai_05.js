"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTask = simulateTask;
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done!!!");
        }, time);
    });
}
//test
// simulateTask(1000)
//     .then(result => {
//         console.log(result);
//     })
