const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");
//poderia estar em outro arquivo
const dbData = [
  {
    name: "John Doe",
  },
  {
    name: "Jane Doe",
  },
];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => require("../src/util/database")).with(MockDatabase);
(async () => {
  {
    const expected = [
      {
        name: "JOHN DOE",
      },
      {
        name: "JANE DOE",
      },
    ];

    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    rewiremock.disable();
    deepStrictEqual(result, expected);
  }
  {
    const expected = [
      {
        name: "ERICK WENDEL",
      }
    ];

    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
