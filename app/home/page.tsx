import { CreateStudySet } from '@/app/ui/study-set/buttons';
import Table from '@/app/ui/home/table';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <div className="w-full">
        <div className="flex w-full items-center justify-center md:text-2xl">
        {session && session.user && <h1>Hi, {session?.user.name}</h1>}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
          <CreateStudySet />
        </div>
        <h2>Your Study Sets</h2>
        <Table />
      </div>
    </main>
  );
}