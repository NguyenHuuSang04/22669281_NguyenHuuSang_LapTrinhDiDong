class Book {
    private attributes: string;
    private title: string;
    private author: string;
    private year: number;

    constructor(attributes: string, title: string, author: string, year: number) {
        this.attributes = attributes;
        this.title = title;
        this.author = author;
        this.year = year;
    }

    // Getter and Setter for attributes
    public getAttributes(): string {
        return this.attributes;
    }
    public setAttributes(attributes: string): void {
        this.attributes = attributes;
    }

    // Getter and Setter for title
    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string): void {
        this.title = title;
    }

    // Getter and Setter for author
    public getAuthor(): string {
        return this.author;
    }
    public setAuthor(author: string): void {
        this.author = author;
    }

    // Getter and Setter for year
    public getYear(): number {
        return this.year;
    }
    public setYear(year: number): void {
        this.year = year;
    }
}
export default Book;