import { sql } from '@vercel/postgres';
import {
	StudySetsTable
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