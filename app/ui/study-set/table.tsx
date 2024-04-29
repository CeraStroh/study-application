'use client';

import { useState } from 'react';
import { Pair, StudySetTable } from '@/app/lib/definitions';

export default function SetTable({
  studyset,
}: {
  studyset: StudySetTable;
}) {
	const [pairs, setPairs] = useState<Pair[]>(JSON.parse(studyset.study_content));

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{pairs.map((item, index) => (
							<div
								key={item.term}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
								<div className="flex items-center justify-between border-b pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<p>{item.term}</p>
										</div>
									</div>
								</div>
								<div className="flex w-full items-center justify-between pt-4">
									<div>
										<p>{item.definition}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Term
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Definition
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{pairs.map((item, index) => (
								<tr
									key={item.term}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<p>{item.term}</p>
										</div>
									</td>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<p>{item.definition}</p>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}