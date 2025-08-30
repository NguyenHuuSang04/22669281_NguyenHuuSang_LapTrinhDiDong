function simulateTask_07(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time)
    });
}

Promise.race([
    simulateTask_07(2300),
    simulateTask_07(1200),
    simulateTask_07(3200),
])
    .then(result => {
        console.log("Task done earliest!!!");
        console.log(result);
    })