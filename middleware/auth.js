const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!(firstName && lastName && email && password)) {
			return res.status(400).send('All field are required');
		}

		const findUserCursor = await db.collection('user').find({ email });

		if ((await findUserCursor.count()) > 0) {
			return res.status(409).send('User already exists. Please login');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const insertUserCursor = await db.collection('user').insertOne({
			firstName,
			lastName,
			email,
			encryptedPassword
		});

		if (!insertUserCursor.acknowledged) {
			throw new Error('Error occurred while inserting document');
		}

		const token = jwt.sign(
			{
				userId: insertUserCursor.insertedId,
				email
			},
			process.env.TOKEN_KEY,
			{
				expiresIn: '3d'
			}
		);

		const updateUserCursor = await db.collection('user').updateOne({
			_id: new ObjectId(insertUserCursor.insertedId)
		}, {
			$set: { token }
		});

		if (!updateUserCursor.acknowledged) {
			throw new Error('Error occurred while updating document');
		}

		res.status(200).json({
			id: insertUserCursor.insertedId,
			firstName,
			lastName,
			email,
			token
		});
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const findUserCursor = db.collection('user').find({ email });

		if ((await findUserCursor.count()) === 0) {
			return res.status(400).send('Email does not exist');
		}

		const user = await findUserCursor.next();

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

		await db.collection('user').updateOne({
			_id: new ObjectId(user._id)
		}, {
			$set: { token }
		});

		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];

		if (!token) {
			return res.status(403).send('Access token is required for authentication');
		}

		const decodedPayload = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decodedPayload;

		next();
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
};

module.exports = { authRouter, verifyToken };