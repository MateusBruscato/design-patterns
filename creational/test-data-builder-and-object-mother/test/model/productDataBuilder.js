const Product = require('../../src/entities/product');

class ProductDataBuilder {
    constructor() {
        // default são valores válidos
        // o caso de sucesso
        this.productData = {
            id: '000101',
            name: 'smartphone',
            price: 999,
            category: 'electronic'
        }
    }

    static aProduct() {
        return new ProductDataBuilder();
    }

    withInvalidId() {
        this.productData.id = '1';
        return this;
    }

    withInvalidName() {
        this.productData.name = 'Opa 1';
        return this;
    }

    withInvalidPrice() {
        this.productData.price = 1001;
        return this;
    }
    
    withInvalidCategory() {
        this.productData.category = 'furniture';
        return this;
    }

    build() {
        return new Product(this.productData);   
    }
}

module.exports = ProductDataBuilder;