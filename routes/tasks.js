const { Router } = require('express');
const router = Router();
const { Task, ProjectRole, Project } = require('./../model');

router.post('projects/:projectId/tasks/0/create', async (req, res) => {
	try {
		const userId = req.user._id;
		const { title, statusId } = req.body;
		const { projectId } = req.params;

		if (!title) {
			return res.status(400).send('All fields are required');
		}

		if (!(await Project.checkIfUserIsAdmin(projectId, userId))) {
			return res.status(401).send('Only admins can create tasks');
		}

		const task = await Task.create(title, projectId, statusId);

		res.status(200).json(task);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('projects/:projectId/tasks/:taskId', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, taskId } = req.params;

		if (!(await ProjectRole.find(userId, projectId))) {
			return res.status(401).send('Unauthorised access');
		}

		const task = await Task.get(taskId);

		if (!task) {
			return res.status(404).end();
		}

		res.status(200).json(task);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('projects/:projectId/tasks/:taskId/update', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, taskId } = req.params;
		const { title, description, dueDate, priority } = req.body;

		if (!(title || description || dueDate || priority)) {
			return res.status(400).send('No field to update provided');
		}

		if (!((await Project.checkIfUserIsAdmin(projectId, userId)) || (await Task.checkIfTaskIsAssigned(taskId, userId)))) {
			return res.status(401).send('Unauthorised access');
		}

		await Task.update(taskId, title, description, priority, dueDate);

		res.status(200).json({
			_id: taskId
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('projects/:projectId/tasks/:taskId/move/:statusId', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, taskId, statusId } = req.params;

		if (!((await Project.checkIfUserIsAdmin(projectId, userId)) || (await Task.checkIfTaskIsAssigned(taskId, userId)))) {
			return res.status(401).send('Unauthorised access');
		}

		if (!(await ProjectRole.hasAuthorisedStatus(userId, projectId, statusId))) {
			return res.status(401).send('Unauthorised access');
		}

		await Task.moveTaskToStatusId(taskId, statusId);

		res.status(200).json({
			_id: taskId
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('projects/:projectId/tasks/:taskId/delete', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, taskId } = req.params;


		if (!(await Project.checkIfUserIsAdmin(projectId, userId))) {
			return res.status(401).send('Only admins can create tasks');
		}

		await Task.del(taskId);

		res.status(200).json({
			_id: taskId
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;