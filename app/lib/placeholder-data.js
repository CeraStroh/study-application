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
		title: 'Midwest US Capitals',
		pairs: 12,
		date: '2024-2-18',
	},
	{
		user_id: users[0].user_id,
		set_id: '53476',
		title: 'COSC Classes',
		pairs: 5,
		date: '2024-2-17',
	},
	{
		user_id: users[0].user_id,
		set_id: '45364',
		title: 'Financial Accounting Exam 1',
		pairs: 4,
		date: '2024-2-16',
	},
];

const MidwestUSCapitals = [
	{
		term: 'Springfield',
		definition: 'Illinois',
	},
	{
		term: 'Indianapolis',
		definition: 'Indiana',
	},
	{
		term: 'Des Moines',
		definition: 'Iowa',
	},
	{
		term: 'Topeka',
		definition: 'Kansas',
	},
	{
		term: 'Lansing',
		definition: 'Michigan',
	},
	{
		term: 'Saint Paul',
		definition: 'Minnesota',
	},
	{
		term: 'Jefferson City',
		definition: 'Missouri',
	},
	{
		term: 'Lincoln',
		definition: 'Nebraska',
	},
	{
		term: 'Bismarck',
		definition: 'North Dakota',
	},
	{
		term: 'Columbus',
		definition: 'Ohio',
	},
	{
		term: 'Pierre',
		definition: 'South Dakota',
	},
	{
		term: 'Madison',
		definition: 'Wisconsin',
	},
]

const COSCClasses = [
	{
		term: 'COSC-109',
		definition: 'Intro to Information Mgmt',
	},
	{
		term: 'COSC-110',
		definition: 'Intro to Computer Science',
	},
	{
		term: 'COSC-130',
		definition: 'Data Structures',
	},
	{
		term: 'COSC-346',
		definition: 'Cybersecurity',
	},
	{
		term: 'COSC-420',
		definition: 'Senior Project',
	},
]

const FinancialAccountingExam1 = [
	{
		term: 'Accounting Equation',
		definition: 'Assets = Liabilities + Stockholders\' Equity',
	},
	{
		term: 'Assets',
		definition: 'things company owns (land, cash, equipment, buildings, inventory, supplies, computers, trucks, office furniture)',
	},
	{
		term: 'Liabilities',
		definition: 'amount business owes/debt (Note Payable-loan, Accounts payable)',
	},
	{
		term: 'Stockholders\' Equity',
		definition: 'owners\' claim to business',
	},
]

module.exports = {
	users,
	studysets,
	MidwestUSCapitals,
	COSCClasses,
	FinancialAccountingExam1,
};