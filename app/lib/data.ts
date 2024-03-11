import { sql } from '@vercel/postgres';
import {
	StudySetsTable
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchStudySets() {
	noStore();
	try {
		const studysetsoriginal = await sql<StudySetsTable>`
			SELECT
				studysetsoriginal.set_id,
				studysetsoriginal.title,
				studysetsoriginal.date
			FROM studysetsoriginal
			ORDER BY title ASC
		`;

		return studysetsoriginal.rows;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch study sets');
	}
}