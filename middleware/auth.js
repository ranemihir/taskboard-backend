const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRouter = Router();
const { User, ProjectRole } = require('./../model');

authRouter.post('/signup', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!(firstName && lastName && email && password)) {
			return res.status(400).send('All field are required');
		}

		const exisitingUser = await User.getByEmail(email);

		if (exisitingUser) {
			return res.status(409).send('User already exists. Please login');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await User.create(
			firstName,
			lastName,
			email,
			encryptedPassword
		);

		const token = jwt.sign(
			{
				userId: user._id,
				email
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: '3d'
			}
		);

		await User.updateToken(user._id, token);

		res.status(200).json({
			_id: user._id,
			firstName,
			lastName,
			email,
			token,

		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.getByEmail(email);

		if (!user) {
			return res.status(400).send('Email does not exist');
		}

		if (!(await bcrypt.compare(password, user.encryptedPassword))) {
			return res.status(400).send('Invalid password');
		}

		const token = jwt.sign(
			{
				userId: user._id,
				email
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: '3d'
			}
		);

		await User.updateToken(user._id, token);

		const projectRolesOfUser = await ProjectRole.getAllProjectRolesOfUser(user._id);

		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			token,
			projectRoles: projectRolesOfUser.map(projectRole => ({
				projectId: projectRole.projectId,
				authorisedStatusIds: projectRole.authorisedStatusIds
			}))
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

const verifyToken = (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];

		if (!token) {
			return res.status(403).send('Access token is required for authentication');
		}

		let decodedPayload;

		try {
			decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
		} catch (err) {
			console.error(err);
			return res.status(401).send('Invalid access token provided');
		}

		req.user = {
			_id: decodedPayload.userId,
			email: decodedPayload.email
		};

		next();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
};

module.exports = { authRouter, verifyToken };