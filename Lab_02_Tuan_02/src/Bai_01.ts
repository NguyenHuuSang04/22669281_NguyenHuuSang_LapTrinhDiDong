function getStringAfterDelay(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000); // trả về sau 2 giây
    });
}

// Cách dùng
getStringAfterDelay().then(result => {
    console.log(result); // Hello Async
});
