'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { StudySetForm, StudySetEditForm } from '@/app/lib/definitions';
import { updateStudySet } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { fetchTermsBySetId, fetchDefinitionsBySetId } from '@/app/lib/data';

export default async function Form({
	studyset,
}: {
	studyset: StudySetForm;
}) {
  // const [terms, definitions] = await Promise.all([
  //   fetchTermsBySetId(studyset.set_id),
  //   fetchDefinitionsBySetId(studyset.set_id),
  // ]);
  const updateStudySetWithSetId = updateStudySet.bind(null, studyset.set_id);
	const [pairs, setPairs] = useState<{ term: string; definition: string; }[]>([{ term: "", definition: "" }]);

	const handleAddPair = () => {
    setPairs([...pairs, { term: "", definition: "" }]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let { name, value } = event.target;
    console.log(event.target);
    let onChangeValue = [...pairs];
    (onChangeValue[index] as any)[name] = value;
    console.log(name);
    setPairs(onChangeValue);
  };

  const handleDeletePair = (index: number): void => {
    const newArray = [...pairs];
    newArray.splice(index, 1);
    setPairs(newArray);
  };

  return (
    <form action={updateStudySetWithSetId}>
      <div className="rounded-md bg-gray-400 p-4 md:p-6">
        {/* Title Name */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-black">
            Title
          </label>
          <div className="relative">
            <input
                id="title"
                name="title"
                type="string"
                placeholder="Enter title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                aria-describedby="title-error"
								value={studyset.title}
            />
          </div>
          {/* <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Term-Definition pairs */}
        <div className="mb-1">
          {pairs.map((item, index) => (
            // {studyset.terms?.map((term) => (
            //   {studyset.definitions?.map((definition) => (
                <div className="input_container" key={index}>
                  <div className="w-full">
                    <label htmlFor="term" className="mb-2 block text-sm font-medium text-black">
                      Term
                    </label>
                    <input
                      id="term"
                      name="term"
                      // type="string"
                      value={studyset.terms}//{item.term}
                      onChange={(event) => handleChange(event, index)}
                      placeholder="Enter term"
                      className="peer w-full block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                      // aria-describedby="pairs-error"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="definition" className="mb-2 block text-sm font-medium text-black">
                      Definition
                    </label>
                    <input
                      id="definition"
                      name="definition"
                      // type="string"
                      value={studyset.definitions}//{item.definition}
                      onChange={(event) => handleChange(event, index)}
                      placeholder="Enter definition"
                      className="peer w-full block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                      // aria-describedby="pairs-error"
                    />
                  </div>
                  <div className="mb-5">
                  {pairs.length > 1 && (
                    <Button onClick={() => handleDeletePair(index)}>Delete</Button>
                  )}
                  </div>
                  <div className="mb-5">
                  {index === pairs.length - 1 && (
                    <Button onClick={() => handleAddPair()}>Add</Button>
                  )}
                  </div>
                </div>
            //   ))}
            // ))}
          ))}
          {/* <div id="pairs-error" aria-live="polite" aria-atomic="true">
            {state.errors?.jsonPairs &&
              state.errors.jsonPairs.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
          {/* <p>This is what the data looks like</p>
          <div className="body"> {jsonPairs} </div> */}
          {/* <p>Here are the terms for {studyset.title}</p>
          <p>{terms}</p> */}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}