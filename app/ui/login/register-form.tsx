'use client';
 
import { lusitana } from '@/app/ui/fonts';
import {
  UserCircleIcon,
	AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { createUser } from '@/app/lib/actions';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function RegisterForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);
  const [question, setQuestion] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setQuestion(event.target.value as string);
    // console.log('question: ', question);
  };
 
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 text-black">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please fill out the form to continue.
        </h1>
        <div className="w-full">
					<div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="string"
                name="name"
                placeholder="Enter your username"
                required
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
					<div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="string"
                name="email"
                placeholder="Enter your email address"
                required
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password (at least 8 characters)
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="security_question"
            >
              Security Question
            </label>
            <div className="relative">
              <Select
                id="security_question"
                name="security_question"
                type="string"
                value={question}
                label="Choose a security question"
                onChange={handleChange}
                required
                aria-describedby="question-error"
              >
                <MenuItem value={'What city were you born in?'}>What city were you born in?</MenuItem>
                <MenuItem value={'What is your oldest sibling’s middle name?'}>What is your oldest sibling’s middle name?</MenuItem>
                <MenuItem value={'What was the first concert you attended?'}>What was the first concert you attended?</MenuItem>
                <MenuItem value={'What was the make and model of your first car?'}>What was the make and model of your first car?</MenuItem>
                <MenuItem value={'In what city or town did your parents meet?'}>In what city or town did your parents meet?</MenuItem>
              </Select>
            </div>
            <div id="question-error" aria-live="polite" aria-atomic="true">
              {state.errors?.security_question &&
                state.errors.security_question.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="security_answer"
            >
              Answer to security question
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="security_answer"
                type="string"
                name="security_answer"
                placeholder="Enter the answer to your security question"
                required
                aria-describedby="answer-error"
              />
            </div>
            <div id="answer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.security_answer &&
                state.errors.security_answer.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <RegisterButton />
      </div>
    </form>
  );
}
 
function RegisterButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Create new account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}