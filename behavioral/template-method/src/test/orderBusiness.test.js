import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import BaseBusiness from "../business/base/baseBusiness";
import Order from "../entities/order";
import OrderBusiness from "../business/orderBusiness";

describe("#Test suite for Template Method design patter", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});
    describe("#OrderBusiness", () => {
        test("Execution Order Business without Template Method", () => {
            const order = new Order({ 
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'Car' }]
            });

            const orderBusiness = new OrderBusiness();
            // todos devs devem obrigatoriamente lembra de seguir a risca esse fluxo de execução
            // se algum esqiecer de chamar a função de validação, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order);
            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(result).toBeTruthy();
        })
        test("Execution Order Business without Template Method", () => {
            const order = new Order({ 
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'Car' }]
            });

            const orderBusiness = new OrderBusiness();
            const validationOrderSpy = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            )

            const createOrderSpy = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )

            const result = orderBusiness.create(order);
            expect(result).toBeTruthy();
            expect(validationOrderSpy).toHaveBeenCalled();
            expect(createOrderSpy).toHaveBeenCalled();
        })
    })
});
