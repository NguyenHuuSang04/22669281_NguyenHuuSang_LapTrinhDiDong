class Stack<T> {
    private items: T[] = [];

    // thêm phần tử vào sack
    push(item: T): void {
        this.items.push(item);
    }

    // lấy phần tử trên cùng ( và xóa )
    pop(): T | undefined {
        return this.items.pop();
    }

    // xem phần tử trên cùng ( không xóa )
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // kiểm tra stack có rỗng không
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Test
const stack = new Stack<number>();
console.log(stack.isEmpty()); // true

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek()); // 30
console.log(stack.pop()); // 30 và xóa 30

console.log(stack.isEmpty()); // false