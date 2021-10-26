const { Router } = require('express');
const router = Router();
const { Project, ProjectRole } = require('./../model');


router.post('/projects/0/create', async (req, res) => {
	try {
		const { name, description } = req.body;
		const userId = req.user._id;

		if (!name) {
			return res.status(400).send('Invalid parameters provided');
		}

		const createProjectResult = await Project.create(name, description, userId);

		res.status(200).json(createProjectResult);
	} catch (err) {
		console.error(err);
		res.status(500).end();

	}
});

router.get('/projects/:_id', async (req, res) => {
	try {
		const projectId = req.params._id;
		const userId = req.user._id;

		if ((await Project.get(projectId)) && (await ProjectRole.checkIfUserIsMember(userId, projectId))) {
			const project = await Project.get(projectId);

			return res.status(200).json(project);
		}

		res.status(401).send('Unathorised access');
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/projects/:_id/update', async (req, res) => {
	try {
		const projectId = req.params._id;
		const { name, description } = req.body;
		const userId = req.user._id;

		if (!(name || description)) {
			return res.status(400).send('Invalid parameters provided');
		}


		if ((await Project.get(projectId)) && (await ProjectRole.checkIfUserIsAdmin(userId, projectId))) {
			await Project.update(projectId, name, description);

			return res.status(200).json({
				_id: projectId,
			});
		}

		res.status(200).json();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/projects/:_id/delete', async (req, res) => {
	try {
		const projectId = req.params._id;
		const userId = req.user._id;

		if ((await Project.get(projectId)) && (await ProjectRole.checkIfUserIsAdmin(userId, projectId))) {
			await Project.del(projectId);

			return res.status(200).json({
				_id: projectId
			});
		}

		res.status(200).send();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});


module.exports = router;