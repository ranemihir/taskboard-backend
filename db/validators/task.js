module.exports = {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [
				'title',
				'projectId',
				'statusId'
			],
			properties: {
				projectId: {
					bsonType: 'objectId',
				},
				title: {
					bsonType: 'string',
					minLength: 1,
					maxLength: 50
				},
				description: {
					bsonType: 'string',
					minLength: 1,
					maxLength: 200
				},
				statusId: {
					bsonType: 'objectId',
				},
				assignedTo: {
					bsonType: 'objectId',
				},
				dueDate: {
					bsonType: 'date',
				},
				priority: {
					bsonType: 'int',
					minimum: 1,
					maximum: 3
				}
			},
		}
	}
};
