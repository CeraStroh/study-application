import { fetchStudySetBySetId } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Flashcard from '@/app/ui/study-set/flashcard';
// import Form from "@/app/ui/study-set/flashcards-form";

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
			{/* <Form studyset={studyset} /> */}
			
			<Flashcard studyset={studyset} />
		</main>
	)
}