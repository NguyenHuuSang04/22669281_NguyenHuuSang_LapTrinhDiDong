"use strict";
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(money) {
        if (money > 0) {
            this.balance += money;
        }
        else {
            console.log("So tien khong hop le");
        }
    }
    withdraw(money) {
        if (this.balance > money) {
            this.balance = this.balance - money;
        }
        else {
            console.log("So du khong du");
        }
    }
}
const bank = new BankAccount(1000);
bank.deposit(3000);
console.log(`So tien sau khi them: ${bank.balance}`);
bank.withdraw(2000);
console.log(`So tien sau khi rut: ${bank.balance}`);
