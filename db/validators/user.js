module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'firstName',
				'lastName',
				'email',
				'encryptedPassword',
				'token'
			],
			properties: {
				firstName: {
					bsonType: 'string',
					minLength: 3,
					maxLength: 15
				},
				lastName: {
					bsonType: 'string',
					minLength: 3,
					maxLength: 15
				},
				email: {
					bsonType: 'string',
					pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
					minLength: 5,
					maxLength: 40
				},
				encryptedPassword: {
					bsonType: 'string',
					minLength: 1
				},
				projectRoleIds: {
					bsonType: 'array',
					description: 'an array of project role ids',
					items: {
						bsonType: 'objectId',
						uniqueItems: true
					}
				},
				token: {
					bsonType: 'string',
					minLength: 1
				}
			},
		}
	}
};
