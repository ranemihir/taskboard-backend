module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'userId',
				'projectId',
			],
			properties: {
				userId: {
					bsonType: 'objectId',
				},
				projectId: {
					bsonType: 'objectId',
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
