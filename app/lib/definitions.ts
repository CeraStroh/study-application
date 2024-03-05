// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
export type User = {
	user_id: string;
	name: string;
	email: string;
	password: string;
};

export type StudySet = {
	user_id: string;
	set_id: string;
	title: string;
	terms: object;
	definitions: object;
	date: string;
};

export type StudySetForm = {
	set_id: string;
	title: string;
	term: string;
	definition: string;
};

export type StudySetField = {
	title: string;
}

export type StudySetsTable = {
	id: string;
	title: string;
	date: string;
}