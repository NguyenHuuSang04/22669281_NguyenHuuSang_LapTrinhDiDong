"use strict";
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
//test
const stringRepo = new Repository();
stringRepo.add("Hello");
stringRepo.add("World");
console.log(stringRepo.getAll());
