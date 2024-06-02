const { expect } = require('chai');
const { it, describe } = require('mocha');
const { productValidator } = require('../src');
const ProductObjectMother = require('./model/productObjectMother');

describe('Test Data Builder', () => {
    it('shouldn\'t reutn error with valid product', () => {
        const product = ProductObjectMother.valid();;
        const result = productValidator(product);

        const expected = {
            result: true,
            errors: []
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a Product with an invalid id', () => {
            const product = ProductObjectMother.withInvalidId();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['id: invalid length, current: [1], expected to be between 2 and 20']
            };
    
            expect(result).to.be.deep.equal(expected);
        });

        it('should return an object error when creating a Product with an name', () => {
            const product = ProductObjectMother.withInvalidName();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['name: invalid name, current: [Opa 1], expected to be only words']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
        it('should return an object error when creating a Product with an price', () => {
            const product = ProductObjectMother.withInvalidPrice();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['price: invalid price, current: [1001], expected to be between 0 and 1000']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
        it('should return an object error when creating a Product with an category', () => {
            const product = ProductObjectMother.withInvalidCategory();
            const result = productValidator(product);
    
            const expected = {
                result: false,
                errors: ['category: invalid category, current: [furniture], expected to be electronic or organic']
            };
    
            expect(result).to.be.deep.equal(expected);
        });
    })
})