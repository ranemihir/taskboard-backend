const ObjectId = require('mongodb').ObjectId;


module.exports = [
	{
		'_id': new ObjectId('617ce5f9fc13ae5fcf00007d'),
		'name': 'Smith-Gutmann',
		'description': 'unleash vertical channels',
		'statuses': [
			{
				'_id': new ObjectId('617d0041fc13ae374e000000'),
				'name': 'To do',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000001'),
				'name': 'In Progress',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000002'),
				'name': 'Done',
			},
		],
		'adminUserIds': [
			new ObjectId('617cddd6fc13ae5fcf000069'),
		]
	},
	{
		'_id': new ObjectId('617ce5f9fc13ae5fcf00007e'),
		'name': 'Dibbert, Schoen and Monahan',
		'statuses': [
			{
				'_id': new ObjectId('617d0041fc13ae374e000003'),
				'name': 'Backlog',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000004'),
				'name': 'Currently Working',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000005'),
				'name': 'Completed',
			},
		],
		'adminUserIds': [
			new ObjectId('617cddd6fc13ae5fcf00006a'),
		]
	},
	{
		'_id': new ObjectId('617ce5f9fc13ae5fcf00007f'),
		'name': 'Dickinson LLC',
		'description': 'transform extensible e-tailers',
		'statuses': [
			{
				'_id': new ObjectId('617d0041fc13ae374e000006'),
				'name': 'to do',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000007'),
				'name': 'under development',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000008'),
				'name': 'under testing',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e000009'),
				'name': 'qa',
			},
			{
				'_id': new ObjectId('617d0041fc13ae374e00000a'),
				'name': 'completed',
			}
		],
		'adminUserIds': [
			new ObjectId('617cddd6fc13ae5fcf00006b'),
			new ObjectId('617cddd6fc13ae5fcf00006c'),
		]
	},
	{
		'_id': new ObjectId('617ce5f9fc13ae5fcf000080'),
		'name': 'Satterfield-Dicki',
		'description': 'morph sticky ROI',
		'adminUserIds': [
			new ObjectId('617cddd6fc13ae5fcf00006d'),
		]
	},
	{
		'_id': new ObjectId('617ce5f9fc13ae5fcf000081'),
		'name': 'Feil LLC',
		'description': 'visualize global technologies',
		'statuses': [
			{
				'_id': new ObjectId('617d0041fc13ae374e00000b'),
				'name': 'my tasks',
			}
		],
		'adminUserIds': [
			new ObjectId('617cddd6fc13ae5fcf00006e'),
		]
	}
];