import Form from '@/app/ui/study-set/edit-form';
import Breadcrumbs from '@/app/ui/study-set/breadcrumbs';
import { fetchStudySetBySetId } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
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
            label: `Edit ${studyset.title}`,
            href: `/home/study-set/${set_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form studyset={studyset} />
    </main>
  );
}