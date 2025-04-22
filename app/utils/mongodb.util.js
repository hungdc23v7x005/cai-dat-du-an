
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connect(uri) {
    await client.connect();
    return client;
}

module.exports = { connect, client };
