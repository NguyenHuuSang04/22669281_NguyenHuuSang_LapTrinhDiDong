"use strict";
function test_Bai13(success) {
    return new Promise((resolve, reject) => {
        if (success)
            resolve("Success");
        else
            reject("Fail");
    });
}
async function run_Bai13(success) {
    try {
        const result = await test_Bai13(success);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
}
run_Bai13(true);
run_Bai13(false);
