function alwaysReject(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);

    });
}

// test
alwaysReject()
    .then(result => {
        console.log("Thành công", result);
    })
    .catch(error => {
        console.error("Thất bại:", error);
    });