"use strict";
function readArray(array) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evenNumbers = array.filter(num => num % 2 === 0);
            resolve(evenNumbers);
        }, 1000);
    });
}
// Test
readArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .then(result => {
    console.log("Các số là số chẵn: ", result);
});
