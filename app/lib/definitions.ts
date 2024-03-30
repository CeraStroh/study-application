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
	study_content: object;
	date: string;
};

export type StudySetForm = {
	set_id: string;
	title: string;
	term: string;
	definition: string;
	study_content: object;
};

export type StudySetEditForm = {
	set_id: string;
	title: string;
	terms: object;
	definitions: object;
	study_content: object;
};

export type StudySetField = {
	title: string;
}

export type StudySetsTable = {
	set_id: string;
	title: string;
	date: string;
}