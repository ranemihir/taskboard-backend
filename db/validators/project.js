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
					maxLength: 40
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
						uniqueItems: true,
						minItems: 1,
						maxItems: 10
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
								minLength: 1,
								maxLength: 40
							}
						}
					},
					maxItems: 8
				},
				invites: {
					bsonType: 'array',
					items: {
						bsonType: 'string',
						pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
						minLength: 5,
						maxLength: 40,
						uniqueItems: true
					}
				}
			}
		}
	}
};
