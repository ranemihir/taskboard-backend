module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'name',
				'adminUserIds'
			],
			properties: {
				name: {
					bsonType: 'string',
					minLength: 3,
					maxLength: 15
				},
				description: {
					bsonType: 'string',
					minLength: 1,
					maxLength: 200
				},
				adminUserIds: {
					bsonType: 'array',
					items: {
						bsonType: 'objectId',
						uniqueItems: true
					}
				},
				statuses: {
					bsonType: 'array',
					items: {
						bsonType: 'object',
						required: [
							'_id',
							'name'
						],
						properties: {
							_id: {
								bsonType: 'objectId',
							},
							name: {
								bsonType: 'string',
								minLength: 3,
								maxLength: 40
							}
						}
					},
					maxItems: 8
				},
				invites: {
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
