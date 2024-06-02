import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = 'postgres://mateusbruscato:mateusbruscato@localhost:5432/heroes';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect();

const mongoDBConnectionString = 'mongodb://admin:admin@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect();

const data = [
    {
        name: 'mateusbr',
        type: 'transaction',
    },
    {
        name: 'mariasilva',
        type: 'activityLog',
    }
]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
};

for (const { name, type } of data) {
    const context = contextTypes[type];
    console.log(type, context.dbStrategy.constructor.name);
    console.log(await context.read());
}