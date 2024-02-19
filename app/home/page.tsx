import { CreateStudySet } from '@/app/ui/study-set/buttons';

export default async function Page() {
  return (
    <main>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1>Home Page</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <CreateStudySet />
        </div>
      </div>
    </main>
  );
}