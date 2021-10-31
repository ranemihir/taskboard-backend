const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const projectCollection = db.collection('project');


async function create(name, description, adminUserId) {
	const createProjectCursor = await projectCollection.insertOne({
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
	const findProjectCursor = projectCollection.find({
		_id: new ObjectId(projectId)
	});

	if ((await findProjectCursor.count()) === 0) {
		return;
	}

	const project = await findProjectCursor.next();

	return project;
}

async function checkIfEmailIsInvited(projectId, email) {
	const findProjectCursor = await projectCollection.find({
		_id: new ObjectId(projectId)
	});

	const project = await findProjectCursor.next();

	if (project.invites.includes(email)) {
		return true;
	}

	return false;
}

async function checkIfUserIsAdmin(projectId, userId) {
	const findAdminCursor = await projectCollection.find({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(userId)
	});

	if ((await findAdminCursor.count()) === 0) {
		return false;
	}

	return true;
}

async function removeUserFromInvites(projectId, email) {
	const removeUserFromInvitesCursor = await projectCollection.updateOne({
		_id: new ObjectId(projectId),
	}, {
		$pull: {
			invites: email
		}
	});

	if (!removeUserFromInvitesCursor.acknowledged) {
		throw new Error('Error occurred while removing user email from invites');
	}

	return true;
}

async function update(projectId, adminUserId, adminUserIds, name, description, invites) {
	const updateProjectCursor = await projectCollection.updateOne({
		_id: new ObjectId(projectId),
		adminUserIds: new ObjectId(adminUserId)
	}, {
		$set: {
			name,
			description,
			adminUserIds: adminUserIds.map(userId => new ObjectId(userId)),
			invites: invites.map(userId => new ObjectId(userId))
		}
	});

	if (!updateProjectCursor.acknowledged) {
		throw new Error('Error occurred while updating a project');
	}

	return true;
}

async function del(projectId, adminUserId) {
	const deleteProjectCursor = await projectCollection.deleteOne({
		_id: new ObjectId(projectId),
		adminUserId: new ObjectId(adminUserId)
	});

	if (!deleteProjectCursor.acknowledged) {
		throw new Error('Error occurred while deleteing a project');
	}

	const deleteAllProjectRolesOfProjectCursor = await db.collection('project_role').deleteMany({
		projectId: new ObjectId(projectId)
	});

	if (!deleteAllProjectRolesOfProjectCursor.acknowledged) {
		throw new Error('Error occurred while deleting all project roles of a project');
	}

	const deleteAllTasksOfProjectCursor = db.collection('task').deleteMany({
		projectId: new Object(projectId)
	});

	if (!deleteAllTasksOfProjectCursor.acknowledged) {
		throw new Error('Error occurred while deleting all tasks of a project');
	}

	return true;
}


module.exports = {
	create,
	get,
	checkIfUserIsAdmin,
	checkIfEmailIsInvited,
	removeUserFromInvites,
	update,
	del
};