const db = require('.');
const ObjectId = require('mongodb').ObjectId;


module.exports = async function (userId) {
	const findProjectRoleCursor = db.collection('project_role').find({ userId });

	if ((await findProjectRoleCursor.count()) === 0) {
		return [];
	}

	const projectRoles = await findProjectRoleCursor.toArray();

	projectRoles.forEach(async (projectRole) => {
		const findProjectCursor = db.collection('project').find({
			_id: new ObjectId(projectRole.projectId)
		});

		const project = await findProjectCursor.next();

		projectRole.project = {
			...project,
			tasks: []
		};

		delete projectRole.projectId;

		projectRole.project.taskIds.forEach(async (taskId) => {
			const findTaskCursor = db.collection('task').find({
				_id: new ObjectId(taskId),
				assignedTo: new ObjectId(userId)
			});

			const task = await findTaskCursor.next();

			projectRole.project.tasks.push({
				...task
			});
		});

		delete projectRole.project.taskIds;
	});

	return projectRoles;
};