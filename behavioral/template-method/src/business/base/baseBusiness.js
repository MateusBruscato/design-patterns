import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(
            this._validateRequiredFields.name
        )
    }
    
    _create() {
        throw new NotImplementedException(
            this._create.name
        )
    }

    /*
    Padrao do Martin Fowler
    a proposta do padrão é garantir um fluxo de métodos,
    definindo uma sequenciar a ser executada

    esse create é a implementação efetiva do Template Method
    */
    create(data) {
        const isValid = this._validateRequiredFields(data);
        if (!isValid) throw new Error(`Invalid data!`);
        // validar campos
        // salvar no banco
        return this._create(data);
    }
}