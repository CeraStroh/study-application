'use client';

import { StudySetField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createStudySet } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function Form() {
  const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createStudySet, initialState);
  const [pairs, setPairs] = useState<{ term: string; definition: string; }[]>([{ term: "", definition: "" }]);
  const jsonPairs = JSON.stringify(pairs);

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

  const handleDeletePair = (index: number, event:  React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newArray = [...pairs];
    newArray.splice(index, 1);
    setPairs(newArray);
  };

  return (
    <form action={createStudySet}>
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
            <div className="input_container" key={index}>
              <div className="w-full">
                <label htmlFor="term" className="mb-2 block text-sm font-medium text-black">
                  Term
                </label>
                <input
                  id="term"
                  name="term"
                  type="string"
                  value={item.term}
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
                  type="string"
                  value={item.definition}
                  onChange={(event) => handleChange(event, index)}
                  placeholder="Enter definition"
                  className="peer w-full block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                  // aria-describedby="pairs-error"
                />
              </div>
              <div className="mb-5">
              {pairs.length > 1 && (
                <Button onClick={(event) => handleDeletePair(index, event)}>Delete</Button>
              )}
              </div>
              <div className="mb-5">
              {index === pairs.length - 1 && (
                <Button onClick={() => handleAddPair()}>Add</Button>
              )}
              </div>
            </div>
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
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}