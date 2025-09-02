"use strict";
async function fetchAPI(url) {
    try {
        const respone = await fetch(url);
        if (!respone.ok) {
            throw new Error(`HTTP error! Status: ${respone.status}`);
        }
        const data = await respone.json();
        return data;
    }
    catch (error) {
        throw error; // để promise.allSettled bắt được reject
    }
}
async function run_bai_30() {
    const results = await Promise.allSettled([
        fetchAPI("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/todoLis"),
        fetchAPI("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/todoLit"),
        fetchAPI("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/todoList"),
    ]);
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(` API ${index + 1} thành công:`, result.value);
        }
        else {
            console.log(` API ${index + 1} thất bại:`, result.reason);
        }
    });
}
run_bai_30();
