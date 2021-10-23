const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
	try {
		await client.connect();

		const db = client.db(process.env.MONGO_DBNAME);
		db.command({ ping: 1 });
		console.log(`Connected to "${db.databaseName}" DB in Mongo is successful`);

		return { client, db };
	} catch (err) {
		console.error(`Error while connecting to MongoDB: ${err}`);
		await client.close();
		process.exit();
	}
}


module.exports = connect;