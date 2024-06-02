import Payment from "./events/payment.js";
import PaymentPublisher from "./publisher/paymentPublisher.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";

const paymentPublisher = new PaymentPublisher();
const payment = new Payment(paymentPublisher);

const marketingObserver = new Marketing();
const shipmentObserver = new Shipment();

paymentPublisher.subscribe(marketingObserver);
paymentPublisher.subscribe(shipmentObserver);

payment.creditCard({ userName: "John Doe", id: Date.now() });

paymentPublisher.unsubscribe(marketingObserver);

payment.creditCard({ userName: "Jane Doe", id: Date.now() });