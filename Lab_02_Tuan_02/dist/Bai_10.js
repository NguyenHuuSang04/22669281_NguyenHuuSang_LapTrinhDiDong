"use strict";
function donePromise(success) {
    return new Promise((resolve, reject) => {
        if (success)
            resolve("Done");
        else
            reject("Fail");
    });
}
// test done: then + finally được thực hiện
donePromise(true)
    .then((result) => {
    console.log(`Then: ${result}`);
})
    .catch((err) => {
    console.log(`Catch: ${err}`);
})
    .finally(() => {
    console.log("Finally: Done ( Then + finally )"); // chạy bất kể success hay failure
});
// catch + finally được thực hiện
donePromise(false)
    .then((result) => {
    console.log(`Then: ${result}`);
})
    .catch((err) => {
    console.log(`Catch: ${err}`);
})
    .finally(() => {
    console.log("Finally: Done ( catch + finally )"); // chạy bất kể success hay failure
});
