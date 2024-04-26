'use client';

import { lusitana } from '@/app/ui/fonts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Pair, StudySetTable } from '@/app/lib/definitions';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import Switch from '@mui/material/Switch';

export default function Flashcard({
	studyset,
  }: {
	studyset: StudySetTable;
  }) {
	const [answerWithTerm, setAnswerWithTerm] = useState(true);
	const [score, setScore] = useState(false);
	const [shuffle, setShuffle] = useState(false);

	const handleAnswerWithTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAnswerWithTerm(event.target.checked);
	};

	const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setScore(event.target.checked);
	};

	const handleShuffleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShuffle(event.target.checked);
	};

	const [pairs] = useState<Pair[]>(JSON.parse(studyset.study_content));
	const [visible, setVisible] = useState(answerWithTerm);
	const [cardIndex, setCardIndex] = useState(0);

	const reset = () => {
		setVisible(answerWithTerm);
		setCardIndex(0);
	}

	const handleVisible = () => {
		if (visible !== false) setVisible(false);
		else setVisible(true);
	};

	const handleNextCard = () => {
		if (cardIndex === pairs.length-1) setCardIndex(0);
		else setCardIndex(cardIndex+1);
		setVisible(answerWithTerm);
	}

	const handlePreviousCard = () => {
		if (cardIndex === 0) setCardIndex(pairs.length-1);
		else setCardIndex(cardIndex-1);
		setVisible(answerWithTerm);
	}

	return (
		<>
			<div className="rounded-md bg-gray-400 p-4 md:p-6">
				<label htmlFor="Answer" className="mb-2 block text-sm font-medium text-black">
					What do you want to answer with?
				</label>
				Definitions
				<Switch
					checked={answerWithTerm}
					onChange={handleAnswerWithTermChange}
					value={answerWithTerm}
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

				<div className="gap-2">
					<Button onClick={reset}>Start Over</Button>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-gray-400 p-2 shadow-sm">
				{pairs.map((item, index) => (
					<div className="w-full">
						{index === cardIndex && (
							<div>
								<Card onClick={handleVisible}>
									<CardContent>
										<div className="flex justify-center items-center">
											{visible === true ? (
												<p>{item.term}</p>
											) : null}
											{visible === false ? (
												<p>{item.definition}</p>
											) : null}
										</div>
									</CardContent>
								</Card>
								<div className="w-full mt-6 flex justify-center items-center">
									<Button onClick={handleVisible}>Flip flashcard</Button>
								</div>
								<div className="w-full mt-6 flex justify-end">
									{cardIndex === 0 ? (
										<Button disabled={true} className="disabled:opacity-75">Previous</Button>
									) : <Button onClick={handlePreviousCard}>Previous</Button>}
									{cardIndex === pairs.length-1 ? (
										<Button onClick={handleNextCard}>Practice again</Button>
									) : <Button onClick={handleNextCard}>Next</Button>}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}