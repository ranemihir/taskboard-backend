const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const projectRoleCollection = db.collection('project_role');


async function create(userId, projectId) {
	const createProjectRoleCursor = await projectRoleCollection.insertOne({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId),
	});

	if (!createProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while inserting project role');
	}

	return { projectRoleId: createProjectRoleCursor.insertedId };
}

async function get(projectRoleId) {
	const findProjectRoleCursor = projectRoleCollection.find({
		_id: new ObjectId(projectRoleId)
	});

	if ((await findProjectRoleCursor.count()) === 0) {
		return;
	}

	const projectRole = await findProjectRoleCursor.next();

	return projectRole;
}

async function find(userId, projectId) {
	const findProjectRoleCursor = projectRoleCollection.find({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId)
	});

	if ((await findProjectRoleCursor.count()) === 0) {
		return;
	}

	const projectRole = await findProjectRoleCursor.next();

	return projectRole;
}

async function getAllProjectRolesOfProject(projectId) {
	const findProjectRolesOfProjectCursor = projectRoleCollection.find({
		projectId: new ObjectId(projectId)
	});

	const allProjectRolesOfProject = await findProjectRolesOfProjectCursor.toArray();

	return allProjectRolesOfProject;
}

async function getAllProjectRolesOfUser(userId) {
	const findProjectRolesOfUserCursor = projectRoleCollection.find({
		userId: new ObjectId(userId)
	});

	const allProjectRolesOfUser = await findProjectRolesOfUserCursor.toArray();

	return allProjectRolesOfUser;
}

async function hasAuthorisedStatus(userId, projectId, authorisedStatusId) {
	const findAuthorisedStatusCursor = projectRoleCollection.find({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId),
		authorisedStatusIds: new ObjectId(authorisedStatusId)
	});

	if ((await findAuthorisedStatusCursor.count()) === 0) {
		return;
	}

	const projectRole = await findAuthorisedStatusCursor.next();

	return projectRole;
}

async function updateAuthorisedStatuses(projectRoleId, authorisedStatusIds) {
	const updateProjectRoleCursor = await projectRoleCollection.updateOne({
		_id: new ObjectId(projectRoleId)
	}, {
		$set: {
			authorisedStatusIds
		}
	});

	if (!updateProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while updating project role');
	}

	return true;
}

async function del(projectRoleId, userId) {
	const deleteProjectRoleCursor = await projectRoleCollection.deleteOne({
		_id: new ObjectId(projectRoleId),
		userId: new ObjectId(userId)
	});

	if (!deleteProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while deleting project role');
	}

	return true;
}

async function remove(projectRoleId) {
	const deleteProjectRoleCursor = await projectRoleCollection.deleteOne({
		_id: new ObjectId(projectRoleId)
	});

	if (!deleteProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while deleting project role');
	}

	return true;
}

module.exports = {
	create,
	get,
	find,
	getAllProjectRolesOfProject,
	getAllProjectRolesOfUser,
	hasAuthorisedStatus,
	updateAuthorisedStatuses,
	del,
	remove
};