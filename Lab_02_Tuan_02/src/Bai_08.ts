function calculatorNumber(num: number): Promise<number> {
    return new Promise((resolve) => {
        console.log("Start with: ", num);
        resolve(num);
    });
}
calculatorNumber(2)
    .then(result => {
        console.log("Step 1: ", result);
        return result * result;

    })
    .then(result => {
        console.log("Step 2: ", result);
        return result * 2;

    })
    .then(result => {
        console.log("Step 3: ", result);
        return result + 5;

    })
    .then(finalResult => {
        console.log("Final Result:", finalResult);
    })