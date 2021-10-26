const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;

async function create(name, description, userId) {
	const createProjectCursor = await db.collection('project').insertOne({
		name,
		description
	});

	if (!createProjectCursor.acknowledged) {
		throw new Error('Error occurred while creating a new project');
	}

	const createProjectRoleCursor = await db.collection('project_role').insertOne({
		userId: new ObjectId(userId),
		projectId: new ObjectId(createProjectCursor.insertedId),
		name: 'admin',
	});

	if (!createProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while creating a new project role');
	}

	return {
		projectId: createProjectCursor.insertedId,
		projectRoleId: createProjectRoleCursor.insertedId
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

async function update(projectId, name, description) {
	const updateProjectCursor = await db.collection('project').updateOne({
		_id: new ObjectId(projectId)
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

async function del(projectId) {
	const deleteProjectCursor = await db.collection('project').deleteOne({
		_id: new ObjectId(projectId)
	});

	if (!deleteProjectCursor.acknowledged) {
		throw new Error('Error occurred while updating a project');
	}

	return true;
}


module.exports = {
	create,
	get,
	update,
	del
};