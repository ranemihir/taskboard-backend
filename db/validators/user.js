module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'firstName',
				'lastName',
				'email',
				'encryptedPassword',
				'projectRoleIds'
			],
			properties: {
				firstName: {
					bsonType: 'string',
					description: 'must be a string and is required',
					minLength: 3,
					maxLength: 15
				},
				lastName: {
					bsonType: 'string',
					description: 'must be a string and is required',
					minLength: 3,
					maxLength: 15
				},
				email: {
					bsonType: 'string',
					description: 'must be a valid email and is required',
					pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
					minLength: 5,
					maxLength: 100
				},
				encryptedPassword: {
					bsonType: 'string',
					description: 'must be a string and is required',
					minLength: 50,
					maxLength: 200
				},
				projectRoleIds: {
					bsonType: 'array',
					description: 'an array of project role ids',
					items: {
						bsonType: 'objectId',
						description: 'must be a valid projectRoleId',
						uniqueItems: true
					}
				},
				token: {
					bsonType: 'string',
					description: 'must be a string'
				}
			},
			additionalProperties: false
		}
	}
};
