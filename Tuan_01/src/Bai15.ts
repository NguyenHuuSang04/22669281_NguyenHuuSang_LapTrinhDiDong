import Book from "./Bai06";
import { User } from "./Bai07";

class Library {
    private books: Book[] = [];
    private users: User[] = [];
    constructor() {
    }

    // thêm sách
    public addBook(book: Book): void {
        this.books.push(book);
    }

    // thêm user 
    public addUser(user: User): void {
        this.users.push(user);
    }

    //in sách
    public listBooks(): void {
        console.log("Danh sách sách trong thư viện: ");
        this.books.forEach((b, index) => {
            console.log(`${index + 1}. ${b.getTitle()} - ${b.getAuthor()} - ${b.getAttributes()}`)
        })
    }
}

const b1 = new Book("Khoa học", "Lập trình TypeScript", "Nguyễn Văn A", 2024);
const b2 = new Book("Tiểu thuyết", "Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1941);

const u1 = new User("Sang");
const u2 = new User("Hương");

const library = new Library();
library.addBook(b1);
library.addBook(b2);
library.addUser(u1);
library.addUser(u2);

library.listBooks();