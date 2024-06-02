import BaseBusiness from "./base/baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
    #order = new Set();

    _create(data) {
        this.#order.add(data);
        return true;
    }

    _validateRequiredFields(data) {
        return !!data.amount && !!data?.products.length;
    }
}