import { sql } from '@vercel/postgres';
import {
	StudySetsTable,
	StudySetForm,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchStudySets() {
	noStore();
	try {
		const studysets = await sql<StudySetsTable>`
			SELECT
				studysets.set_id,
				studysets.title,
				studysets.date
			FROM studysets
			ORDER BY title ASC
		`;

		return studysets.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch study sets');
	}
}

export async function fetchStudySetBySetId(set_id: string) {
	noStore();
	try {
		const data = await sql<StudySetForm>`
			SELECT
				studysets.set_id,
				studysets.title,
				studysets.terms,
				studysets.definitions,
				studysets.study_content
			FROM studysets
			WHERE studysets.set_id = ${set_id};
		`;

		const studyset = data.rows.map((studyset) => ({
			...studyset,
		}));
		console.log(studyset); // Study Set is an empty array[]
		return studyset[0];
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch study set.');
	}
}