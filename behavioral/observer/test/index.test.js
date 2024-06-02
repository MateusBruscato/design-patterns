import { expect, describe, test, jest, beforeAll } from '@jest/globals';
import PaymentPublisher from '../src/publisher/paymentPublisher.js';
import Payment from '../src/events/payment.js';
import Marketing from '../src/observers/marketing.js';
import Shipment from '../src/observers/shipment.js';

describe('Test Suite for Observer Pattern', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('#PaymentPublisher should notify all observers', () => {
        const publisher = new PaymentPublisher();
        const observer = {
            update: jest.fn()
        }
        const data = "hello world";
        const expected = data;
       
        publisher.subscribe(observer);
        publisher.notify(data);
       
        expect(observer.update).toHaveBeenCalledWith(expected);
    });
    test('#PaymentPublisher should not notify unsubscribed observers', () => {
        const publisher = new PaymentPublisher();
        const observer = {
            update: jest.fn()
        }

        const data = "hello world";
       
        publisher.subscribe(observer);
        publisher.unsubscribe(observer);
        publisher.notify(data);
       
        expect(observer.update).not.toHaveBeenCalled();
    });
    test('#Payment should notify publisher after a credit card payment is made', () => {
        const paymentPublisher = new PaymentPublisher();
        const payment = new Payment(paymentPublisher);
        
        const paymentPublisherNotifierySpy = jest.spyOn(
            payment.paymentPublisher,
            payment.paymentPublisher.notify.name
        );

        const data =  { userName: "John Doe", id: Date.now() };
        payment.creditCard(data);

        expect(paymentPublisherNotifierySpy).toBeCalledWith(data);
    });
    test('#All should notify subscribers after a payment is made', () => {
        const publisher = new PaymentPublisher();
        const payment = new Payment(publisher);
        const marketingObserver = new Marketing();
        const shipmentObserver = new Shipment();

        const marketingSpy = jest.spyOn(marketingObserver, marketingObserver.update.name);
        const shipmentSpy = jest.spyOn(shipmentObserver, shipmentObserver.update.name);

        publisher.subscribe(marketingObserver);
        publisher.subscribe(shipmentObserver);

        const data = { userName: "John Doe", id: Date.now() };
        payment.creditCard(data);

        expect(marketingSpy).toBeCalledWith(data);
        expect(shipmentSpy).toBeCalledWith(data);
    });
})