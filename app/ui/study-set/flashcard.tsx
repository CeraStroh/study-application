'use client';

import { lusitana } from '@/app/ui/fonts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Pair, StudySetTable } from '@/app/lib/definitions';
import { useState } from 'react';
import { Button } from '@/app/ui/button';

export default function Flashcard({
	studyset,
  }: {
	studyset: StudySetTable;
  }) {
	const [pairs] = useState<Pair[]>(JSON.parse(studyset.study_content));
	const [defaultVisible] = useState<String>("front")
	const [visible, setVisible] = useState<String>(defaultVisible);
	const [cardIndex, setCardIndex] = useState(0);
// 	front,
// 	back,
// 	visible
// }: {
// 	front: string;
// 	back: string;
// 	visible: 'front' | 'back';
// }) {
	const handleVisible = () => {
		if (visible !== "back") setVisible("back");
		else setVisible("front");
	};

	const handleNextCard = () => {
		if (cardIndex === pairs.length-1) setCardIndex(0);
		else setCardIndex(cardIndex+1);
		setVisible(defaultVisible);
	}

	const handlePreviousCard = () => {
		if (cardIndex === 0) setCardIndex(pairs.length-1);
		else setCardIndex(cardIndex-1);
		setVisible(defaultVisible);
	}


	return (
		<div className="rounded-xl bg-gray-400 p-2 shadow-sm">
			{/* <div className="flex p-4"> */}
				{pairs.map((item, index) => (
					<div className="w-full">
						{index === cardIndex && (
							<div>
								<Card onClick={handleVisible}>
									<CardContent>
										<div className="flex justify-center items-center">
											{visible === 'front' ? (
												<p>{item.term}</p>
											) : null}
											{visible === 'back' ? (
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
										<Button onClick={handleNextCard}>Start Over</Button>
									) : <Button onClick={handleNextCard}>Next</Button>}
								</div>
							</div>
						)}
					</div>
				))}
			{/* </div> */}
		</div>
	);
}