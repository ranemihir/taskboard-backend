const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;

async function create(name, description, userId) {
	const createProjectCursor = await db.collection('project').insertOne({
		name,
		description,
		adminUserId: new ObjectId(userId)
	});

	if (!createProjectCursor.acknowledged) {
		throw new Error('Error occurred while creating a new project');
	}

	return {
		projectId: createProjectCursor.insertedId,
	};
}

async function get(projectId) {
	const findProjectCursor = db.collection('project').find({
		_id: new ObjectId(projectId)
	});

	if ((await findProjectCursor.count()) === 0) {
		return;
	}

	const project = await findProjectCursor.next();

	return project;
}

async function checkIfUserIsAdmin(projectId, userId) {
	const findAdminCursor = await db.collection('project').find({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(userId)
	});

	if ((await findAdminCursor.count()) === 0) {
		return false;
	}

	return true;
}

async function update(projectId, userId, name, description) {
	const updateProjectCursor = await db.collection('project').updateOne({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(userId)
	}, {
		$set: {
			name,
			description
		}
	});

	if (!updateProjectCursor.acknowledged) {
		throw new Error('Error occurred while updating a project');
	}

	return true;
}

async function del(projectId, userId) {
	const deleteProjectCursor = await db.collection('project').deleteOne({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(userId)
	});

	if (!deleteProjectCursor.acknowledged) {
		throw new Error('Error occurred while updating a project');
	}

	return true;
}


module.exports = {
	create,
	get,
	checkIfUserIsAdmin,
	update,
	del
};