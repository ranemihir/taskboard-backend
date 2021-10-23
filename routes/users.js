const { Router } = require('express');
const router = Router();
const db = require('./../db');


router.post('/users/:id/update', async (req, res) => {
	try {
		const cursor = await db.userCollection.updateOne({
			_id: req.params.id
		}, {
			firstName: req.body.firstName,
			lastName: req.body.lastName
		});

		res.status(200).send(cursor);
	} catch (err) {
		console.error(err);
		res.status(500).end();

	}
});

router.post('/users/:id/delete', async (req, res) => {
	try {
		const cursor = await db.userCollection.deleteOne({
			_id: req.params.id
		});

		res.status(200).send(cursor);
	} catch (err) {
		console.error(err);
		res.status(500).end();
	}
});


module.exports = router;