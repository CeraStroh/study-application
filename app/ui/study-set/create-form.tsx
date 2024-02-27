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
import { createStudySet, createStudySetContent } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createStudySet, initialState);
  const [pairs, setPairs] = useState([{ term: "", definition: "" }]);

  const handleAddPair = () => {
    setPairs([...pairs, { term: "", definition: "" }]);
  };

  const handleChange = (event: any, index: number) => {
    let { name, value } = event.target;
    console.log(event.target)
    let onChangeValue = [...pairs];
    onChangeValue[index][name] = value;
    console.log(name);
    setPairs(onChangeValue);
  };

  const handleDeletePair = (index: number) => {
    const newArray = [...pairs];
    newArray.splice(index, 1);
    setPairs(newArray);
  };

  return (
    <form action={dispatch}>
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
                step="0.01"
                placeholder="Enter title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                aria-describedby="title-error"
            />
            {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Term-Definition pairs */}
        <div className="mb-1 columns-2">
          <div className="container">
            {pairs.map((item, index) => (
              <div className="input_container" key={index}>
                <div className="w-full">
                  <label htmlFor="term" className="mb-2 block text-sm font-medium text-black">
                    Term
                  </label>
                  <div className='relative'>
                    <input
                      id="term"
                      name="term"
                      type="string"
                      value={item.term}
                      onChange={(event) => handleChange(event, index)}
                      placeholder="Enter term"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                      aria-describedby="term-error"
                    />
                    {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                  </div>
                </div>
                {/* <div id="term-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.term &&
                    state.errors.term.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div> */}
                <div className="w-full">
                  <label htmlFor="definition" className="mb-2 block text-sm font-medium text-black">
                    Definition
                  </label>
                  <div className="relative">
                    <input
                      id="definition"
                      name="definition"
                      type="string"
                      value={item.definition}
                      onChange={(event) => handleChange(event, index)}
                      placeholder="Enter definition"
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                      aria-describedby="definition-error"
                    />
                    {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                  </div>
                </div>
                {/* <div id="definition-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.definition &&
                    state.errors.definition.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div> */}
                {pairs.length > 1 && (
                  <Button onClick={() => handleDeletePair(index)}>Delete</Button>
                )}
                {index === pairs.length - 1 && (
                  <Button onClick={() => handleAddPair()}>Add</Button>
                )}
              </div>
            ))}
            <p>This is what the data looks like</p>
            <div className="body"> {JSON.stringify(pairs)} </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/home/study-set"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
