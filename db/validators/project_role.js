module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'userId',
				'projectId',
				'name',
			],
			properties: {
				userId: {
					bsonType: 'objectId',
				},
				projectId: {
					bsonType: 'objectId',
				},
				name: {
					bsonType: 'string',
					minLength: 3,
					maxLength: 30
				},
				authorisedStatusIds: {
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
