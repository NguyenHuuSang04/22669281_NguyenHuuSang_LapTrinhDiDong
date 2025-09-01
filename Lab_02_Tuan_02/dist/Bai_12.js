"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bai_05_1 = require("./Bai_05");
async function run_simulateTask(num) {
    const result = await (0, Bai_05_1.simulateTask)(num);
    console.log(result);
}
run_simulateTask(2000);
