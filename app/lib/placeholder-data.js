// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
	{
		user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
		name: 'User',
		email: 'user@testmail.com',
		password: 'testunodostres',
		security_question: '',
		security_answer: '',
	},
];
  
const studysets = [
	{
		user_id: users[0].user_id,
		title: 'Midwest US Capitals',
		date: '2024-2-18',
		terms: ['Springfield', 'Indianapolis', 'Des Moines', 'Topeka', 'Lansing', 'Saint Paul', 'Jefferson City', 'Lincoln', 'Bismarck', 'Columbus', 'Pierre', 'Madison'],
		definitions: ['Illinois', 'Indiana', 'Iowa', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 'Nebraska', 'North Dakota', 'Ohio', 'South Dakota', 'Wisconsin'],
		study_content: [],
	},
	{
		user_id: users[0].user_id,
		title: 'Spanish Numbers',
		date: '2024-2-17',
		terms: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'],
		definitions: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
		study_content: [],
	},
	{
		user_id: users[0].user_id,
		title: 'Financial Accounting Exam 1',
		date: '2024-2-16',
		terms: ['Accounting Equation', 'Assets', 'Liabilities', 'Stockholders\' Equity'],
		definitions: ['Assets = Liabilities + Stockholders\' Equity', 'things company owns (land, cash, equipment, buildings, inventory, supplies, computers, trucks, office furniture)', 'amount business owes/debt (Note Payable-loan, Accounts payable)', 'owners\' claim to business'],
		study_content: [],
	},
];

module.exports = {
	users,
	studysets,
};