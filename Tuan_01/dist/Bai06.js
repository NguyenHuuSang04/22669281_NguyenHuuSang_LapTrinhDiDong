"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(attributes, title, author, year) {
        this.attributes = attributes;
        this.title = title;
        this.author = author;
        this.year = year;
    }
    // Getter and Setter for attributes
    getAttributes() {
        return this.attributes;
    }
    setAttributes(attributes) {
        this.attributes = attributes;
    }
    // Getter and Setter for title
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    // Getter and Setter for author
    getAuthor() {
        return this.author;
    }
    setAuthor(author) {
        this.author = author;
    }
    // Getter and Setter for year
    getYear() {
        return this.year;
    }
    setYear(year) {
        this.year = year;
    }
}
exports.default = Book;
