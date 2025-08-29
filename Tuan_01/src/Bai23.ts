interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Số tiền thanh toán: ${amount}`);
    }

}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Số tiền thanh toán bằng thẻ: ${amount}`);
    }
}

let cashPayment = new CashPayment();
let cardPayment = new CardPayment();

cashPayment.pay(10000);
cardPayment.pay(30000);