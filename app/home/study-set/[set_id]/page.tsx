import Breadcrumbs from '@/app/ui/study-set/breadcrumbs';
import { fetchStudySetBySetId } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import SetTable from '@/app/ui/study-set/table';
import { FlashcardPractice } from '@/app/ui/study-set/buttons';
 
export default async function Page({ params }: { params: { set_id: string } }) {
  const set_id = params.set_id;
  const [studyset] = await Promise.all([
		fetchStudySetBySetId(set_id)
	]);
	

	if (!studyset) {
		notFound();
	}

	return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Study Sets', href: '/home/' },
          {
            label: `${studyset.title}`,
            href: `/home/study-set/${set_id}/`,
            active: true,
          },
        ]}
      />
			<div className="mt-4 flex items-center justify-end gap-2 md:mt-8">        
      	<FlashcardPractice set_id={studyset.set_id} />
			</div>
      <SetTable studyset={studyset} />
    </main>
  );
}