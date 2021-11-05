const ObjectId = require('mongodb').ObjectId;


module.exports = [
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103080'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Write a release note',
		statusId: new ObjectId('617d0041fc13ae374e000000'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104062'),
		dueDate: new Date(),
		priority: 1,
		tags: [
			'content',
			'marketing'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103081'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Design the brand logo',
		statusId: new ObjectId('617d0041fc13ae374e000001'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104063'),
		dueDate: new Date(),
		priority: 2,
		tags: [
			'UI Design',
			'Figma'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103082'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Invite user to a project',
		statusId: new ObjectId('617d0041fc13ae374e000000'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104064'),
		dueDate: new Date(),
		priority: 3,
		tags: [
			'frontend'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103083'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Create HTML email template',
		statusId: new ObjectId('617d0041fc13ae374e000002'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104065'),
		dueDate: new Date(),
		priority: 1,
		tags: [
			'HTML',
			'CSS'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103084'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Improve page load time',
		statusId: new ObjectId('617d0041fc13ae374e000000'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104067'),
		dueDate: new Date(),
		priority: 2,
		tags: [
			'improvement',
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103085'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Create iOS home page',
		statusId: new ObjectId('617d0041fc13ae374e000001'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104068'),
		dueDate: new Date(),
		priority: 3,
		tags: [
			'react',
			'gatsby'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103086'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Improve layout design',
		statusId: new ObjectId('617d0041fc13ae374e000002'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf104069'),
		dueDate: new Date(),
		priority: 2
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103087'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Troubleshoot the client issue',
		statusId: new ObjectId('617d0041fc13ae374e000002'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf10406a'),
		dueDate: new Date(),
		priority: 3
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103088'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Fix the bug on dashboard',
		statusId: new ObjectId('617d0041fc13ae374e000001'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf10406b'),
		dueDate: new Date(),
		priority: 1,
		tags: [
			'bug fix'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf103089'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Write a blog article on climate change',
		statusId: new ObjectId('617d0041fc13ae374e000000'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf10406c'),
		dueDate: new Date(),
		priority: 2,
		tags: [
			'content'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf10308a'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Fix the shopping cart bug',
		statusId: new ObjectId('617d0041fc13ae374e000000'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf10406d'),
		dueDate: new Date(),
		priority: 3,
		tags: [
			'bug fix'
		]
	},
	{
		_id: new ObjectId('618cdda6fc13ae5fcf10308b'),
		projectId: new ObjectId('617ce5f9fc13ae5fcf00007d'),
		title: 'Integrate the Chat API',
		statusId: new ObjectId('617d0041fc13ae374e000002'),
		assignedTo: new ObjectId('617cddd6fc13ae5fcf10406e'),
		dueDate: new Date(),
		priority: 1
	},
];