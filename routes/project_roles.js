const { Router } = require('express');
const router = Router();
const { ProjectRole } = require('./../model');

router.post('projects/:projectId/project_role/0/create', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId } = req.params;

		const createProjectResult = await ProjectRole.create(userId, projectId);

		res.status(200).json(createProjectResult);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('projects/:projectId/project_role/:_id', async (req, res) => {
	try {
		const userId = req.user._id;
		const projectRoleId = req.params._id;

		const projectRole = await ProjectRole.get(projectRoleId);

		if (!projectRole) {
			return res.status(404).status('Invalid project role id');
		}

		if (projectRole.userId != userId) {
			return res.status(401).send('Unauthorised request');
		}

		res.status(200).json(projectRole);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('projects/:projectId/project_role/:_id/update', async (req, res) => {
	try {
		// const userId = req.user._id;
		const projectRoleId = req.params._id;
		const { authorisedStatuses } = req.body;

		await ProjectRole.updateAuthorisedStatuses(projectRoleId, authorisedStatuses);

		res.status(200).json({
			_id: projectRoleId
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('projects/:projectId/project_role/:_id/delete', async (req, res) => {
	try {
		const userId = req.user._id;
		const projectRoleId = req.params._id;

		await ProjectRole.del(projectRoleId, userId);

		res.status(200).send({ _id: projectRoleId });
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
