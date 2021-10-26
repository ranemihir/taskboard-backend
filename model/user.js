const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;

async function create(firstName, lastName, email, encryptedPassword, token) {
	const createUserCursor = await db.collection('user').insertOne({
		firstName,
		lastName,
		email,
		encryptedPassword,
		token
	});

	if (!createUserCursor.acknowledged) {
		throw new Error('Error occurred while inserting a new user');
	}

	return {
		_id: new ObjectId(createUserCursor.insertedId)
	};
}

async function get(userId) {
	const findUserCursor = db.collection('user').find({
		_id: new ObjectId(userId)
	});

	const user = await findUserCursor.next();

	if (user == null) {
		return false;
	}

	return user;
}

async function getByEmail(email) {
	const findUserCursor = db.collection('user').find({
		email
	});

	const user = await findUserCursor.next();

	if (user == null) {
		return false;
	}

	return user;
}

async function update(userId, firstName, lastName, email, encryptedPassword) {
	const updateUserCursor = await db.collection('user').updateOne({
		_id: new ObjectId(userId)
	}, {
		$set: {
			firstName,
			lastName,
			email,
			encryptedPassword
		}
	});

	if (!updateUserCursor.acknowledged) {
		throw new Error('Error occurred while updating a user');
	}

	return true;
}

async function updateToken(userId, token) {
	const updateUserCursor = await db.collection('user').updateOne({
		_id: new ObjectId(userId)
	}, {
		$set: {
			token
		}
	});

	if (!updateUserCursor.acknowledged) {
		throw new Error('Error occurred while updating a user token');
	}

	return true;
}

async function del(userId) {
	const deleteUserCursor = await db.collection('user').deleteOne({
		_id: new ObjectId(userId)
	});

	if (!deleteUserCursor.acknowledged) {
		throw new Error('Error occurred while deleting a user');
	}

	return true;
}


module.exports = {
	create,
	get,
	getByEmail,
	update,
	updateToken,
	del
};