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
				},
				projectId: {
					bsonType: 'objectId',
				},
				roleName: {
					bsonType: 'string',
					minLength: 3,
					maxLength: 30
				},
				statusIds: {
					bsonType: 'array',
					items: {
						bsonType: 'objectId',
						uniqueItems: true
					}
				}
			},
		}
	}
};
