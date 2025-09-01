function getStringAfterDelay_Bai11(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}
// viết lại bằng async/ await
async function run() {
    const result = await getStringAfterDelay_Bai11();
    console.log(result);
}

run();
