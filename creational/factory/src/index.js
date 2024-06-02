const UserFactory = require("./factory/userFactory");

(async () => {
  const userFactory = await UserFactory.createInstance();
const users = await userFactory.find();
console.log(users);
})();
