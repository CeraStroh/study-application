import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
//import { deleteStudySet } from '@/app/lib/actions';

export function CreateStudySet() {
  return (
    <Link
      href="/home/study-set/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Study Set</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}