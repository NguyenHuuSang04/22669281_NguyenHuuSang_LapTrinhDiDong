import { simulateTask } from "./Bai_05";

async function run_simulateTask(num: number) {
    const result = await simulateTask(num);
    console.log(result);
}

run_simulateTask(2000);