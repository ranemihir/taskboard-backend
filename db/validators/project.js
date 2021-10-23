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
					description: 'must be a string and is required',
					minLength: 3,
					maxLength: 15
				},
				description: {
					bsonType: 'string',
					description: 'must be a string',
					minLength: 1,
					maxLength: 200
				},
				taskIds: {
					bsonType: 'array',
					description: 'an array of task object ids',
					items: {
						bsonType: 'objectId',
						description: 'must be a valid task id',
						uniqueItems: true
					}
				},
				statuses: {
					bsonType: 'array',
					description: 'an array of task object ids',
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
								description: 'unique object id'
							},
							name: {
								bsonType: 'string',
								description: 'must be a string and is required',
								minLength: 3,
								maxLength: 40
							},
							order: {
								bsonType: 'int',
								description: 'must be a int and is required',
								maximum: 20
							}
						}
					}
				}
			},
			additionalProperties: false
		}
	}
};
