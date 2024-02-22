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

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createStudySet, initialState);
  const pairs = 1;

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

        {/* Number of Term-Definition pairs */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-black">
            Choose a number of Term-Definition pairs
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pairs"
                name="pairs"
                type="number"
                step="1"
                min="1"
                max="50"
                placeholder="1"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
                aria-describedby="pairs-error"
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <div id="pairs-error" aria-live="polite" aria-atomic="true">
              {state.errors?.pairs &&
                state.errors.pairs.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
                </div>
          </div>
        </div>

        {/* Term Definition pair */}
        <div className="mb-4 columns-2">
          displayPairs(pairs);
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

export function displayPairs(pairs: number) {
  const studyPairs = [];

  for (let i = 0; i < pairs; i++) {
    studyPairs.push(<>
      <div className="w-full">
        <label htmlFor="term" className="mb-2 block text-sm font-medium text-black">
          Term
        </label>
        <div className="relative">
          <input
              id="term"
              name="term"
              type="string"
              step="0.01"
              placeholder="Enter term"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
              aria-describedby="term-error"
          />
          {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
        </div>
        {/* <div id="term-error" aria-live="polite" aria-atomic="true">
          {state.errors?.term &&
            state.errors.term.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
      </div>
      <div className="w-full">
        <label htmlFor="definition" className="mb-2 block text-sm font-medium text-black">
          Definition
        </label>
        <div className="relative">
          <input
              id="definition"
              name="definition"
              type="string"
              step="0.01"
              placeholder="Enter definition"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-black text-black"
              aria-describedby="definition-error"
          />
          {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
        </div>
        {/* <div id="definition-error" aria-live="polite" aria-atomic="true">
          {state.errors?.definition &&
            state.errors.definition.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div> */}
      </div>
    </>)
  }

  return (
    <>
      {studyPairs}
    </>
  );
}