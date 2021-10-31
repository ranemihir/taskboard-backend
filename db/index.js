const { MongoClient } = require('mongodb');
const {
	userSchema,
	projectSchema,
	projectRoleSchema,
	taskSchema
} = require('./validators');

const SeedData = require('./seed_data');

const client = new MongoClient(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectAndConfigureDB() {
	try {
		// connect ot mongo
		await client.connect();

		const db = client.db(process.env.MONGO_DBNAME);
		db.command({ ping: 1 });
		console.log(`Connected to "${db.databaseName}" DB in Mongo is successful`);

		// get exisiting collection names
		const collectionNames = new Set();

		await db.listCollections().forEach(collection => collectionNames.add(collection.name));

		// create collections if doesn't already exist
		if (!collectionNames.has('user')) {
			await db.createCollection('user', userSchema);
			console.log('"user" collection created');

			await db.createCollection('userView', {
				viewOn: 'user',
				pipeline: [
					{
						$project: {
							_id: 1,
							firstName: 1,
							lastName: 1
						}
					}
				]
			});

			console.log('"userView" view created');
		}

		if (!collectionNames.has('project')) {
			await db.createCollection('project', projectSchema);
			console.log('"project" collection created');
		}

		if (!collectionNames.has('project_role')) {
			await db.createCollection('project_role', projectRoleSchema);
			console.log('"project role" collection created');
		}

		if (!collectionNames.has('task')) {
			await db.createCollection('task', taskSchema);
			console.log('"task" collection created');
		}

		// seed data
		await db.collection('user').insertMany(SeedData.users);
		await db.collection('project').insertMany(SeedData.projects);

	} catch (err) {
		console.error(err);
		process.exit();
	}
}

connectAndConfigureDB();
const db = client.db(process.env.MONGO_DBNAME);

module.exports = {
	client,
	db
};