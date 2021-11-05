const { Router } = require('express');
const router = Router();
const { ProjectRole, Project, User } = require('./../model');

router.post('/projects/:projectId/accept_invitation', async (req, res) => {
	try {
		const userId = req.user._id;
		const userEmail = req.user.email;
		const { projectId } = req.params;

		if (!(await Project.checkIfEmailIsInvited(userEmail))) {
			return res.status(401).send('Unauthorised request');
		}

		const projectRole = await ProjectRole.create(userId, projectId);

		await Project.removeUserFromInvites(projectId, userEmail);

		res.status(200).json(projectRole);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('/projects/:projectId/project_roles', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId } = req.params;

		if (!(await ProjectRole.find(userId, projectId))) {
			return res.status(401).send('Unauthorised access');
		}

		const projectRoles = await ProjectRole.getAllProjectRolesOfProject(projectId);
		const userIds = projectRoles.map(projectRole => projectRole.userId);

		const usersMap = {};

		(await User.getUsers(userIds)).map(u => {
			usersMap[u._id] = {
				firstName: u.firstName,
				lastName: u.lastName
			};
		});

		delete usersMap[userId];

		const projectRolesResult = projectRoles.map(projectRole => {
			const userProperties = usersMap[projectRole.userId];

			return {
				...projectRole,
				...userProperties
			};
		});

		res.status(200).json(projectRolesResult);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('/projects/:projectId/project_roles/:projectRoleId', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, projectRoleId } = req.params;

		if (!(await ProjectRole.find(userId, projectId))) {
			return res.status(401).send('Unauthorised access');
		}

		const projectRole = await ProjectRole.get(projectRoleId);
		const user = await User.get(projectRole.userId);

		res.status(200).json({
			...projectRole,
			firstName: user.firstName,
			lastName: user.lastName
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('/project_roles', async (req, res) => {
	try {
		const userId = req.user._id;
		const projectRoles = await ProjectRole.getAllProjectRolesOfUser(userId);

		res.status(200).json(projectRoles);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/project_roles/:projectRoleId/update', async (req, res) => {
	try {
		// const userId = req.user._id;
		const { projectRoleId } = req.params;
		const { authorisedStatusIds } = req.body;

		await ProjectRole.update(projectRoleId, authorisedStatusIds);

		res.status(200).json({
			_id: projectRoleId,
			authorisedStatusIds
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/project_roles/:projectRoleId/delete', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, projectRoleId } = req.params;

		if ((await Project.checkIfUserIsAdmin(projectId, userId))) {
			await ProjectRole.remove(projectRoleId);
		} else {
			await ProjectRole.del(projectRoleId, userId);
		}

		res.status(200).send(projectRoleId);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
