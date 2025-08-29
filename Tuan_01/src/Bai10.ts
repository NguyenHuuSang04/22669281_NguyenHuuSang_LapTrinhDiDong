class Account{
    public numberAccount: number;
    private balance: number;
    readonly name: string;

    constructor(numberAccount: number, balance: number, name: string) {
        this.numberAccount = numberAccount;
        this.balance = balance;
        this.name = name;
    }

    get getBalance(): number{
        return this.balance;
    }
    
}

const account = new Account(123, 20.000, "Sang");
console.log(account.numberAccount); // in ra được
// console.log(account.balance); // không được vì nó là private
console.log(account.getBalance); // chỉ gọi private bằng cách get
console.log(account.name);