function simulateTask_06(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms `);
        }, time);
    });
}


Promise.all([
    simulateTask_06(1000),
    simulateTask_06(2000),
    simulateTask_06(3000)

]).then(results => {
    console.log("All Tasks done!!!");
    console.log(results);
});

