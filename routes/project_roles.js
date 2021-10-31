const { Router } = require('express');
const router = Router();
const { ProjectRole, Project, User } = require('./../model');

router.post('projects/:projectId/accept_invitation', async (req, res) => {
	try {
		const userId = req.user._id;
		const userEmail = req.user.email;
		const { projectId } = req.params;

		if (!(await Project.checkIfEmailIsInvited(userEmail))) {
			return res.status(401).send('Unauthorised request');
		}

		const createProjectRoleResult = await ProjectRole.create(userId, projectId);

		await Project.removeUserFromInvites(projectId, userEmail);

		res.status(200).json(createProjectRoleResult);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('projects/:projectId/project_roles', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId } = req.params;

		const projectRoles = await ProjectRole.getAllProjectRolesOfProject(projectId);
		const userIds = projectRoles.map(projectRole => projectRole.userId);

		if (!userIds.includes(userId)) {
			return res.status(401).send('Unauthorised request');
		}

		const usersMap = await (await User.getUsers(userIds)).map(u => {
			const userMap = {};

			userMap[u._id] = {
				firstName: u.firstName,
				lastName: u.lastName
			};

			return userMap;
		});

		const projectRolesResult = projectRoles.map(projectRole => {
			const userProperties = usersMap[projectRole.userId];

			return {
				...projectRole,
				userProperties
			};
		});

		res.status(200).json(projectRolesResult);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.get('project_roles', async (req, res) => {
	try {
		const userId = req.user._id;
		const projectRoles = await ProjectRole.getAllProjectRolesOfUser(userId);

		res.status(200).json(projectRoles);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('project_roles/:projectRoleId/update', async (req, res) => {
	try {
		// const userId = req.user._id;
		const { projectRoleId } = req.params;
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

router.post('project_roles/:projectRoleId/delete', async (req, res) => {
	try {
		const userId = req.user._id;
		const { projectId, projectRoleId } = req.params;

		if ((await Project.checkIfUserIsAdmin(projectId, userId))) {
			await ProjectRole.remove(projectRoleId);
		} else {
			await ProjectRole.del(projectRoleId, userId);
		}

		res.status(200).send({ _id: projectRoleId });
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

module.exports = router;
