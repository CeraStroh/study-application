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

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442b',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
];

const invoices = [
	{
		customer_id: customers[0].id,
		amount: 15795,
		status: 'pending',
		date: '2022-12-06',
	},
	{
		customer_id: customers[1].id,
		amount: 20348,
		status: 'pending',
		date: '2022-11-14',
	},
];

const revenue = [
	{ month: 'Jan', revenue: 2000 },
	{ month: 'Feb', revenue: 1800 },
	{ month: 'Mar', revenue: 2200 },
	{ month: 'Apr', revenue: 2500 },
	{ month: 'May', revenue: 2300 },
	{ month: 'Jun', revenue: 3200 },
	{ month: 'Jul', revenue: 3500 },
	{ month: 'Aug', revenue: 3700 },
	{ month: 'Sep', revenue: 2500 },
	{ month: 'Oct', revenue: 2800 },
	{ month: 'Nov', revenue: 3000 },
	{ month: 'Dec', revenue: 4800 },
];

module.exports = {
	users,
	studysets,
	// invoices,
	//revenue,
};