const { expect } = require('chai');
const { it, describe } = require('mocha');
const { productValidator } = require('./../src');
const ProductDataBuilder = require('./model/productDataBuilder');

describe('Test Data Builder', () => {
    it('shouldn\'t reutn error with valid product', () => {
        const product = ProductDataBuilder.aProduct().build();
        const result = productValidator(product);

        const expected = {
            result: true,
            errors: []
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a Product with an invalid id', () => {
            const product = ProductDataBuilder.aProduct().withInvalidId().build();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['id: invalid length, current: [1], expected to be between 2 and 20']
            };
    
            expect(result).to.be.deep.equal(expected);
        });

        it('should return an object error when creating a Product with an name', () => {
            const product = ProductDataBuilder.aProduct().withInvalidName().build();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['name: invalid name, current: [Opa 1], expected to be only words']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
        it('should return an object error when creating a Product with an price', () => {
            const product = ProductDataBuilder.aProduct().withInvalidPrice().build();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['price: invalid price, current: [1001], expected to be between 0 and 1000']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
        it('should return an object error when creating a Product with an category', () => {
            const product = ProductDataBuilder.aProduct().withInvalidCategory().build();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['category: invalid category, current: [furniture], expected to be electronic or organic']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
    })
})