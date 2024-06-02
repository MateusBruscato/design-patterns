import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import BaseBusiness from "../business/base/baseBusiness";
import { NotImplementedException } from "../util/exceptions";

describe("#BaseBusiness test", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
	});
    
	test("Should throw an error when child class doesn't implement _validateRequiredFields function", () => {
		class ConcreteClass extends BaseBusiness {}
		const concreteClass = new ConcreteClass();
		const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);

		expect(() => concreteClass.create({})).toThrow(validationError);
	});

	test("Should throw an error when _validateRequiredFields return false", () => {
		const VALIDATION_DOESTN_SUCCEEDED = false;
		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESTN_SUCCEEDED);
		}

		const concreteClass = new ConcreteClass();
		const invalidDataError = new Error("Invalid data!");

		expect(() => concreteClass.create({})).toThrow(invalidDataError);
	});

	test("Should throw an error when child class doesn't implement _create function", () => {
		const VALIDATION_SUCCEEDED = true;
		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED);
		}

		const concreteClass = new ConcreteClass();
		const validationError = new NotImplementedException(concreteClass._create.name);
		expect(() => concreteClass.create({})).toThrow(validationError);
	});

	test("Should call _create and _validateRequiredFields on create", () => {
		const VALIDATION_SUCCEEDED = true;
		const CREATE_SUCCEEDED = true;

		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED);
			_create = jest.fn().mockReturnValue(CREATE_SUCCEEDED);
		}

		const concreteClass = new ConcreteClass();
		const createFromBaseClass = jest.spyOn(
			BaseBusiness.prototype,
			BaseBusiness.prototype.create.name
		);
		const result = concreteClass.create({});

		expect(result).toBeTruthy();
		expect(createFromBaseClass).toHaveBeenCalled();
		expect(concreteClass._create).toHaveBeenCalled();
		expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
	});
});
