const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../db');

const router = Router();

router.post('/signup', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		if (!(firstName && lastName && email && password)) {
			return res.status(400).send('All field are required');
		}

		const existingUser = await db.userCollection.findOne({ email });

		if (existingUser) {
			return res.status(409).send('User already exists. Please login');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = db.userCollection.create({
			firstName,
			lastName,
			email,
			encryptedPassword
		});

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

		await db.userCollection.updateOne({ _id: user._id }, { token });

		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = db.userCollection.findONe({ email });

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

		await db.userCollection.updateOne({ _id: user._id }, {
			token
		});

		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});


module.exports = router;