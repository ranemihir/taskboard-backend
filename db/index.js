const connect = require('./client');
const {
	userSchema,
	projectSchema,
	projectRoleSchema,
	taskSchema
} = require('./validators');

class DB {
	userCollection;
	projectCollection;
	projectRoleCollection;
	taskCollection;

	async configure() {
		try {
			// connect to mongo
			const { db } = await connect();

			// create necessary collections
			this.userCollection = await db.createCollection('user', userSchema);
			this.projectCollection = await db.createCollection('project', projectSchema);
			this.projectRoleCollection = await db.createCollection('project_role', projectRoleSchema);
			this.taskCollection = await db.createCollection('task', taskSchema);

		} catch (err) {
			console.error(err);
			process.exit();
		}
	}
}

const db = new DB();
db.configure();

module.exports = db;