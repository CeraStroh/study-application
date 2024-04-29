import { fetchStudySetBySetId } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Flashcard from '@/app/ui/study-set/flashcard';

export default async function Page({ params }: { params: { set_id: string } }) {
	const set_id = params.set_id;
	const [studyset] = await Promise.all([
		fetchStudySetBySetId(set_id)
	]);

	if (!studyset) {
		notFound();
	}

	return (
		<main>
			<Flashcard studyset={studyset} />
		</main>
	)
}