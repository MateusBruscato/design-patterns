export default class Payment {
    constructor(paymentPublisher) {
        this.paymentPublisher = paymentPublisher;
    }

    creditCard(paymentData) {
        console.log(`A payment ocurred from ${paymentData.userName}`);
        this.paymentPublisher.notify(paymentData);
    }
}