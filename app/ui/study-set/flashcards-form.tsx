'use client';

import Link from "next/link";
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { Button } from '@/app/ui/button';
import { StudySetForm } from "@/app/lib/definitions";

export default function Form({
	studyset,
}: {
	studyset: StudySetForm;
}) {
	const [answer, setAnswer] = useState(true);
  const [score, setScore] = useState(false);
	const [shuffle, setShuffle] = useState(false);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.checked);
  };

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScore(event.target.checked);
  };

	const handleShuffleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShuffle(event.target.checked);
  };

	return (
		<form>
      	<div className="rounded-md bg-gray-400 p-4 md:p-6">
					<label htmlFor="Answer" className="mb-2 block text-sm font-medium text-black">
						What do you want to answer with?
					</label>
					Definitions
					<Switch
					checked={answer}
					onChange={handleAnswerChange}
					inputProps={{ 'aria-label': 'controlled' }}
					/>
					Terms
					
					<label htmlFor="Score" className="mb-2 block text-sm font-medium text-black">
						Do you want to keep score of correct and incorrect answers?
					</label>
					No
					<Switch
					checked={score}
					onChange={handleScoreChange}
					inputProps={{ 'aria-label': 'controlled' }}
					/>
					Yes

					<label htmlFor="Shuffle" className="mb-2 block text-sm font-medium text-black">
						Do you want to shuffle the flashcards?
					</label>
					No
					<Switch
					checked={shuffle}
					onChange={handleShuffleChange}
					inputProps={{ 'aria-label': 'controlled' }}
					/>
					Yes
				</div>
				<div className="mt-6 flex justify-end gap-4">
					{/* <Link
						href={`/home/study-set/${studyset.set_id}/`}
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Cancel
					</Link>
					<Link
						href={`/home/study-set/${studyset.set_id}/flashcards/practice`}
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Start
					</Link>
					<Button type="submit">Start</Button> */}
				</div>
			</form>
	);
}