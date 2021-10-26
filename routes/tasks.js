const { Router } = require('express');
const router = Router();
const { Task, User } = require('./../model');

router.post('tasks/0/create', async (req, res) => {
	try {
		const userId = req.user._id;
		const { title, projectId } = req.body;

		if (!(await User.get(userId))) {
			return res.status(401).send('Unauthorised access');
		}

		const task = await Task.create(title, projectId);

		res.status(200).json(task);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('tasks/:_id', async (req, res) => {
	try {
		const userId = req.user._id;
		const taskId = req.params._id;

		if ()

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

router.post('tasks/:_id/update', async (req, res) => {
	try {
		const userId = req.user._id;
		const taskId = req.params._id;


	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('tasks/:_id/delete', async (req, res) => {
	try {
		const userId = req.user._id;
		const taskId = req.params._id;

		
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;