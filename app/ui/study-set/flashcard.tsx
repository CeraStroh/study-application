'use client';

import { lusitana } from '@/app/ui/fonts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Pair, StudySetTable } from '@/app/lib/definitions';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import Switch from '@mui/material/Switch';
import { number } from 'zod';

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
	const [scoreChoice, setScoreChoice] = useState(score);
	const [shuffleChoice, setShuffleChoice] = useState(shuffle);
	const [cardIndex, setCardIndex] = useState(0);
	const indexArray = [];
	const [correctScore, setCorrectScore] = useState(0);
	const [totalScore] = useState(pairs.length);

	const reset = () => {
		setVisible(answerWithTerm);
		setScoreChoice(score);
		setShuffleChoice(shuffle);
		fillIndexArray();
		setCardIndex(0);
		setCorrectScore(0);
		
	};

	const fillIndexArray = () => {
		for (var i = 0; i < pairs.length; i++) {
			indexArray.push(i);
		}
		if (shuffleChoice) {
			for (var i = pairs.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = indexArray[i];
				indexArray[i] = indexArray[j];
				indexArray[j] = temp;
			}
		}
	};

	const handleVisible = () => {
		if (visible !== false) setVisible(false);
		else setVisible(true);
	};

	const handleNextCard = () => {
		if (cardIndex === pairs.length-1) {
			setCardIndex(0);
			setCorrectScore(0);
		} else {
			setCardIndex(cardIndex+1);
		}
		setVisible(answerWithTerm);
	};

	const handlePreviousCard = () => {
		if (cardIndex === 0) setCardIndex(pairs.length-1);
		else setCardIndex(cardIndex-1);
		setVisible(answerWithTerm);
	};

	const handleCorrect = () => {
		if (correctScore !== totalScore) setCorrectScore(correctScore + 1);
		handleNextCard();
	};

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
					<Button onClick={reset}>Save Changes</Button>
				</div>
			</div>

			<div className="mt-4 rounded-xl bg-gray-400 p-2 shadow-sm">
				{pairs.map((item, index) => (
					<div className="w-full" key={index}>
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
								<div className="w-full mt-6 flex justify-center items-center space-x-4">
									{scoreChoice === true ? (
										<Button onClick={handleNextCard} className="bg-red-700 hover:bg-red-400">Incorrect</Button>
									) : null}
									<Button onClick={handleVisible}>Flip flashcard</Button>
									{scoreChoice === true ? (
										<Button onClick={handleCorrect} className="bg-green-600 hover:bg-green-300">Correct</Button>
									) : null}
								</div>
								<div className="mt-6">
									<div className="flex justify-end space-x-2">
										{scoreChoice === true ? (
											<h2>{correctScore} / {totalScore}</h2>
										) :
											<>
												{cardIndex === 0 ? (
													<Button disabled={true} className="disabled:opacity-75 hover:bg-blue-500">Previous</Button>
												) : <Button onClick={handlePreviousCard}>Previous</Button>}
												{cardIndex === pairs.length-1 ? (
													<Button onClick={handleNextCard}>Practice again</Button>
												) : <Button onClick={handleNextCard}>Next</Button>}
											</>
										}
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}