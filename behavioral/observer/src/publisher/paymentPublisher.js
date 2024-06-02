export default class PaymentPublisher {
    #observers = new Set();

    notify(paymentData) {
        this.#observers.forEach(observer => observer.update(paymentData));
    }

    subscribe(observable) {
        this.#observers.add(observable);
    }

    unsubscribe(observable) {
        this.#observers.delete(observable);
    }
}