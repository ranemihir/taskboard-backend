module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'userId',
				'projectId',
				'roleName',
				'statusIds'
			],
			properties: {
				userId: {
					bsonType: 'objectId',
					description: 'must be a valid user object id and is required'
				},
				projectId: {
					bsonType: 'objectId',
					description: 'must be a valid project id and is required'
				},
				roleName: {
					bsonType: 'string',
					description: 'must be a string and is required',
					minLength: 3,
					maxLength: 30
				},
				statusIds: {
					bsonType: 'array',
					description: 'an array of status object ids',
					items: {
						bsonType: 'objectId',
						description: 'must be a valid status object id',
						uniqueItems: true
					}
				}
			},
			additionalProperties: false
		}
	}
};
