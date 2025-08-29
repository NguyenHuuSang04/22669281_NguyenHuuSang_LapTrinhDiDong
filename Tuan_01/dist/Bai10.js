"use strict";
class Account {
    constructor(numberAccount, balance, name) {
        this.numberAccount = numberAccount;
        this.balance = balance;
        this.name = name;
    }
    get getBalance() {
        return this.balance;
    }
}
const account = new Account(123, 20.000, "Sang");
console.log(account.numberAccount); // in ra được
// console.log(account.balance); // không được vì nó là private
console.log(account.getBalance); // chỉ gọi private bằng cách get
console.log(account.name);
