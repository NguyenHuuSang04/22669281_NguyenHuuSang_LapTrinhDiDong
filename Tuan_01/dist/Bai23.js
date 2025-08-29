"use strict";
class CashPayment {
    pay(amount) {
        console.log(`Số tiền thanh toán: ${amount}`);
    }
}
class CardPayment {
    pay(amount) {
        console.log(`Số tiền thanh toán bằng thẻ: ${amount}`);
    }
}
let cashPayment = new CashPayment();
let cardPayment = new CardPayment();
cashPayment.pay(10000);
cardPayment.pay(30000);
