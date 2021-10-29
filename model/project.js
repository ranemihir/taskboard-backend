const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;

async function create(name, description, adminUserId) {
	const createProjectCursor = await db.collection('project').insertOne({
		name,
		description,
		adminUserIds: [new ObjectId(adminUserId)]
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

async function update(projectId, adminUserId, adminUserIds, name, description) {
	const updateProjectCursor = await db.collection('project').updateOne({
		_id: new ObjectId(projectId),
		adminUserIds: new ObjectId(adminUserId)
	}, {
		$set: {
			name,
			description,
			adminUserIds: adminUserIds.map(userId => new ObjectId(userId))
		}
	});

	if (!updateProjectCursor.acknowledged) {
		throw new Error('Error occurred while updating a project');
	}

	return true;
}

async function del(projectId, adminUserId) {
	const deleteProjectCursor = await db.collection('project').deleteOne({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(adminUserId)
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