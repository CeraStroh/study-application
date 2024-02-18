// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
	{
		user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
		name: 'User',
		email: 'user@testmail.com',
		password: 'testunodostres',
	},
];
  
const studysets = [
	{
		user_id: users[0].user_id,
		set_id: '65473',
		title: 'US Capitals',
		pairs: '50',
		date: '2024-2-18',
	},
	{
		user_id: users[0].user_id,
		set_id: '53476',
		title: 'COSC Classes',
		pairs: '4',
		date: '2024-2-17',
	},
	{
		user_id: users[0].user_id,
		set_id: '45364',
		title: 'Cybersecurity Terms',
		pairs: '5',
		date: '2024-2-16',
	},
];

module.exports = {
	users,
	studysets,
	// invoices,
	//revenue,
};