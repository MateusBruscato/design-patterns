class UserRepository {

    constructor({ dbConnection }) {
        this.dbConnection = dbConnection;
    }

    async find() {
        return this.dbConnection.find({ name: "Erick Wendel" });
    }
}

module.exports = UserRepository;