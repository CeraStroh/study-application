'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
	StudySet
} from './definitions';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  user_id: z.string(),
  set_id: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  terms: z.coerce.string(),
  definitions: z.coerce.string(),
  date: z.string(),
});

const CreateStudySet = FormSchema.omit({ user_id: true, set_id: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    terms?: object[];
    definitions?: object[];
  };
  message?: string | null;
};
 
export async function createStudySet(formData: FormData) {
  console.log(`Running createStudySet()`);
  //Validate form using Zod
  const { title, terms, definitions } = CreateStudySet.parse({
    title: formData.get('title'),
    terms: formData.getAll('term'),
    definitions: formData.getAll('definition'),
  });
  // const compact_title = `${title}`.toLowerCase().replace(/\s/g, "");
  const user_id = '410544b2-4001-4271-9855-fec4b6a6442a';
  const date = new Date().toISOString().split('T')[0];
  // console.log(`after validatedFields`);
  // // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   console.log(`in unusccessful validatedFields`);
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Create Study Set.',
  //   };
  // }
  // console.log(`before preparing data`);
  // // Prepare data for insertion into the database
  // const { title, terms, definitions } = validatedFields.data;
  console.log(`title: ${title}`);
  // console.log(`compact_title: ${compact_title}`);
  console.log(`terms: ${terms}`);
  console.log(`definitions: ${definitions}`);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO studysets (user_id, title, date)
      VALUES (${user_id}, ${title}, ${date})
      ON CONFLICT (set_id) DO NOTHING;
    `;
    console.log(`Added ${title} to studysets table`);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to add Study Set to table.',
    };
  }
  // console.log(`in between studysets table and creating table`);
  // console.log(`compact_title: ${compact_title}`);
  // // Create Study Set table
  // try {
  //   await sql`
  //     CREATE TABLE ${compact_title} (
  //       term VARCHAR(255),
  //       definition VARCHAR(255)
  //     );
  //   `;
  //   console.log(`Created ${compact_title} table`);
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to create ${compact_title} table',
  //   };
  // }
  // console.log(`in between creating table and adding pairs`);
  // // Insert pairs into table
  // try {
  //   await sql<StudySet>`
  //     INSERT INTO ${compact_title} (term, definition)
  //     VALUES (${terms}, ${definitions});
  //   `;
  //   console.log(`Inserted pairs into ${compact_title} table`);
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to insert pairs into ${compact_title} table',
  //   };
  // }
  // console.log(`in between adding pairs and revalidating/redirecting`);
  // Revalidate the cache for the home page and redirect the user.
  revalidatePath('/home');
  redirect('/home');
}

export async function createTest(formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    terms: formData.getAll('term'),
    definitions: formData.getAll('definition'),
  };
  // Test it out:
  // console.log(rawFormData);
  // console.log(typeof rawFormData.title);
  // console.log(typeof rawFormData.terms);
  // console.log(typeof rawFormData.definitions);
}
