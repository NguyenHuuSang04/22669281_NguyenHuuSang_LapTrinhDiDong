"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bai06_1 = __importDefault(require("./Bai06"));
const Bai07_1 = require("./Bai07");
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    // thêm sách
    addBook(book) {
        this.books.push(book);
    }
    // thêm user 
    addUser(user) {
        this.users.push(user);
    }
    //in sách
    listBooks() {
        console.log("Danh sách sách trong thư viện: ");
        this.books.forEach((b, index) => {
            console.log(`${index + 1}. ${b.getTitle()} - ${b.getAuthor()} - ${b.getAttributes()}`);
        });
    }
}
const b1 = new Bai06_1.default("Khoa học", "Lập trình TypeScript", "Nguyễn Văn A", 2024);
const b2 = new Bai06_1.default("Tiểu thuyết", "Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1941);
const u1 = new Bai07_1.User("Sang");
const u2 = new Bai07_1.User("Hương");
const library = new Library();
library.addBook(b1);
library.addBook(b2);
library.addUser(u1);
library.addUser(u2);
library.listBooks();
