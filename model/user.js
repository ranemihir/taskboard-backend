const { db } = require('./../db');
const ObjectId = require('mongodb').ObjectId;
const userView = db.collection('userView');
const userCollection = db.collection('user');

async function getUsers(userIds) {
	const findUserCursor = userView.find({
		_id: {
			$in: userIds.map(userId => new ObjectId(userId))
		}
	});

	const users = await findUserCursor.toArray();

	return users;
}


async function create(firstName, lastName, email, encryptedPassword, token) {
	const createUserCursor = await userCollection.insertOne({
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
	const findUserCursor = userCollection.find({
		_id: new ObjectId(userId)
	});

	const user = await findUserCursor.next();

	if (user == null) {
		return false;
	}

	return user;
}

async function getByEmail(email) {
	const findUserCursor = userCollection.find({
		email
	});

	const user = await findUserCursor.next();

	if (user == null) {
		return false;
	}

	return user;
}

async function update(userId, firstName, lastName, email, encryptedPassword) {
	const updateUserCursor = await userCollection.updateOne({
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
	const updateUserCursor = await userCollection.updateOne({
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
	const deleteUserCursor = await userCollection.deleteOne({
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
	getUsers,
	getByEmail,
	update,
	updateToken,
	del
};