const { MongoClient } = require('mongodb');

const client = new MongoClient('');

async function run() {
	try {
		await client.connect(process.env.MONGO_URL);

		await client.db(process.env.MONGO_DBNAME).command({ ping: 1 });
		console.log('Connection to MongoDB is successful');
	} catch (err) {
		console.error(`Error while connecting to MongoDB: ${err}`);
	}
}

module.exports = run;