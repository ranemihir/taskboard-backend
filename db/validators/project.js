module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'name',
				'taskIds',
				'statuses'
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
				taskIds: {
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
							'name',
							'order'
						],
						properties: {
							_id: {
								bsonType: 'objectId',
							},
							name: {
								bsonType: 'string',
								minLength: 3,
								maxLength: 40
							},
							order: {
								bsonType: 'int',
								maximum: 20
							}
						}
					}
				}
			},
		}
	}
};
