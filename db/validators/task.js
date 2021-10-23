module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'title',
				'statusId'
			],
			properties: {
				title: {
					bsonType: 'string',
					description: 'must be a string and is required',
					minLength: 1,
					maxLength: 50
				},
				description: {
					bsonType: 'string',
					description: 'must be a string',
					minLength: 1,
					maxLength: 200
				},
				statusId: {
					bsonType: 'objectId',
					description: 'must be a valid status object id and is required'
				},
				assignedTo: {
					bsonType: 'objectId',
					description: 'must be a valid user object id'
				},
				dueDate: {
					bsonType: 'date',
					description: 'must be a date'
				},
				priority: {
					bsonType: 'int',
					description: 'must be an int between 1 to 3',
					minimum: 1,
					maximum: 3
				}
			},
			additionalProperties: false
		}
	}
};
