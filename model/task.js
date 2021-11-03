const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const taskCollection = db.collection('task');


async function create(title, projectId, statusId) {
	const createTaskCursor = await taskCollection.insertOne({
		title,
		projectId: new ObjectId(projectId),
		statusId: new ObjectId(statusId)
	});

	if (!createTaskCursor.acknowledged) {
		throw new Error('Error occurred while inserting a task');
	}

	return {
		_id: createTaskCursor.insertedId
	};
}

async function get(taskId) {
	const findTaskCursor = taskCollection.find({
		_id: new ObjectId(taskId)
	});

	if ((await findTaskCursor.count()) === 0) {
		return;
	}

	const task = await findTaskCursor.next();

	return task;
}

async function checkIfTaskIsAssigned(taskId, userId) {
	const findAssignedTaskCursor = await taskCollection.find({
		_id: new ObjectId(taskId),
		assignedTo: new Object(userId)
	});

	if ((await findAssignedTaskCursor.next()) == null) {
		return false;
	}

	return true;
}

async function getAllAssignedTasks(userId) {
	const findAssignedTasksCursor = taskCollection.find({
		assingedTo: new ObjectId(userId)
	});

	const assignedTasks = await findAssignedTasksCursor.toArray();

	return assignedTasks;
}

async function getAssignedTasksFromProject(userId, projectId) {
	const findAssignedTasksCursor = taskCollection.find({
		assingedTo: new ObjectId(userId),
		projectId: new ObjectId(projectId)
	});

	const assignedTasksFromProject = await findAssignedTasksCursor.toArray();

	return assignedTasksFromProject;
}

async function getAllTasksFromProject(projectId) {
	const findAllTasksOfProjectCursor = taskCollection.find({
		projectId: new ObjectId(projectId)
	});

	const allTasksOfProject = await findAllTasksOfProjectCursor.toArray();

	return allTasksOfProject;
}

async function update(taskId, title, description, priority, dueDate) {
	const updateTaskCursor = await taskCollection.updateOne({
		_id: new ObjectId(taskId)
	}, {
		$set: {
			title,
			description,
			priority,
			dueDate
		}
	});

	if (!updateTaskCursor.acknowledged) {
		throw new Error('Error occurred while updating a task');
	}

	return true;
}

async function moveTaskToStatusId(taskId, statusId) {
	const moveTaskCursor = await taskCollection.updateOne({
		_id: new Object(taskId)
	}, {
		$set: {
			statusId: new ObjectId(statusId)
		}
	});

	if (!moveTaskCursor.acknowledged) {
		throw new Error('Error occurred while updating a task');
	}

	return true;
}

async function assignTask(taskId, assigneeId) {
	const assignTaskCursor = await taskCollection.updateOne({
		_id: new ObjectId(taskId)
	}, {
		$set: {
			assignedTo: new Object(assigneeId)
		}
	});

	if (!assignTaskCursor.acknowledged) {
		throw new Error('Error occurred while updating a task');
	}

	return true;
}

async function del(taskId) {
	const deleteTaskCursor = await taskCollection.deleteOne({
		_id: new ObjectId(taskId)
	});

	if (!deleteTaskCursor.acknowledged) {
		throw new Error('Error occurred while deleting a task');
	}

	return true;
}


module.exports = {
	create,
	get,
	checkIfTaskIsAssigned,
	getAllAssignedTasks,
	getAssignedTasksFromProject,
	getAllTasksFromProject,
	update,
	moveTaskToStatusId,
	assignTask,
	del
};