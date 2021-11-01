const { Router } = require('express');
const router = Router();
const { Project, ProjectRole } = require('./../model');


router.post('/projects/0/create', async (req, res) => {
	try {
		const { name, description } = req.body;
		const userId = req.user._id;

		if (!name) {
			return res.status(400).send('"name" not provided');
		}

		const createProjectResult = await Project.create(name, description, userId);

		const createProjectRoleResult = await ProjectRole.create(userId, createProjectResult.projectId);

		res.status(200).json({
			project: {
				_id: createProjectResult.projectId,
				userId,
				adminUserIds: [userId]
			},
			projectRole: {
				_id: createProjectRoleResult.projectRoleId,
				userId,
				projectId: createProjectResult.projectId
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();

	}
});

router.get('/projects/:_id', async (req, res) => {
	try {
		const projectId = req.params._id;
		const userId = req.user._id;

		const project = await Project.get(projectId);

		if (project && (await ProjectRole.find(userId, projectId))) {
			if (!(project.adminUserIds.includes(userId))) {
				delete project.invites;
			}

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
		const { name, description, adminUserIds, invites } = req.body;
		const userId = req.user._id;

		if (!(name || description || (adminUserIds && adminUserIds.length > 0) || invites)) {
			return res.status(400).send('Invalid parameters provided');
		}

		await Project.update(projectId, userId, adminUserIds, name, description, invites);

		res.status(200).json({
			_id: projectId,
			name,
			description,
			adminUserIds,
			invites
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/projects/:_id/delete', async (req, res) => {
	try {
		const projectId = req.params._id;
		const userId = req.user._id;

		await Project.del(projectId, userId);

		return res.status(200).send(projectId);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});


module.exports = router;