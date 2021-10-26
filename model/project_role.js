const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;

const ProjectRoleType = {
	ADMIN: 'ADMIN',
	MEMBER: 'MEMBER'
};

async function create(userId, projectId, name) {
	const createProjectRoleCursor = await db.collection('project_role').insertOne({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId),
		name
	});

	if (!createProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while inserting project role');
	}

	return true;
}

async function get(projectRoleId) {
	const findProjectRoleCursor = db.collection('project_role').find({
		_id: new ObjectId(projectRoleId)
	});

	if ((await findProjectRoleCursor.count()) === 0) {
		return;
	}

	const projectRole = await findProjectRoleCursor.next();

	return projectRole;
}

async function find(userId, projectId) {
	const findProjectRoleCursor = db.collection('project_role').find({
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
	const findProjectRolesOfProjectCursor = db.collection('project_role').find({
		projectId: new ObjectId(projectId)
	});

	const allProjectRolesOfProject = await findProjectRolesOfProjectCursor.toArray();

	return allProjectRolesOfProject;
}

async function getAllProjectRolesOfUser(userId) {
	const findProjectRolesOfUserCursor = db.collection('project_role').find({
		userId: new ObjectId(userId)
	});

	const allProjectRolesOfUser = await findProjectRolesOfUserCursor.toArray();

	return allProjectRolesOfUser;
}

async function checkIfUserIsAdmin(userId, projectId) {
	const findProjectRoleCursor = db.collection('project_role').find({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId)
	});

	if ((await findProjectRoleCursor.count()) === 0) {
		return false;
	}

	const projectRole = await findProjectRoleCursor.next();

	if (projectRole.name === ProjectRole.ADMIN) {
		return true;
	}

	return false;
}

async function checkIfUserIsMember(userId, projectId) {
	const findProjectRoleCursor = db.collection('project_role').find({
		userId: new ObjectId(userId),
		projectId: new ObjectId(projectId)
	});

	if ((await findProjectRoleCursor.count()) === 0) {
		return false;
	}

	return true;
}

async function hasAuthorisedStatus(projectRoleId, authorisedStatusId) {
	const findAuthorisedStatusCursor = db.collection('project_role').find({
		_id: new ObjectId(projectRoleId),
		authorisedStatusIds: new ObjectId(authorisedStatusId)
	});

	if ((await findAuthorisedStatusCursor.count()) === 0) {
		return;
	}

	const projectRole = await findAuthorisedStatusCursor.next();

	return projectRole;
}

async function updateRole(projectRoleId, name) {
	const updateProjectRoleCursor = await db.collection('project_role').updateOne({
		_id: new ObjectId(projectRoleId)
	}, {
		$set: {
			name
		}
	});

	if (!updateProjectRoleCursor.acknowledged) {
		throw new Error('Error occurred while updating project role');
	}

	return true;
}

async function updateAuthorisedStatuses(projectRoleId, authorisedStatusIds) {
	const updateProjectRoleCursor = await db.collection('project_role').updateOne({
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
	const deleteProjectRoleCursor = await db.collection('project_role').deleteOne({
		_id: new ObjectId(projectRoleId),
		userId: new ObjectId(userId)
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
	checkIfUserIsAdmin,
	checkIfUserIsMember,
	hasAuthorisedStatus,
	updateRole,
	updateAuthorisedStatuses,
	del,
	ProjectRoleType
};