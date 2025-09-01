function test_Bai13(success: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
        if (success) resolve("Success");
        else reject("Fail");
    });
}

async function run_Bai13(success: boolean) {
    try {
        const result = await test_Bai13(success);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

run_Bai13(true);
run_Bai13(false);