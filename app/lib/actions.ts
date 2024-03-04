'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  terms: z.coerce.string(),
  definitions: z.coerce.string(),
  date: z.string(),
});

const CreateStudySet = FormSchema.omit({ id: true, date: true });

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
  const compactTitle = `${title}`.toLowerCase().replace(/\s/g, "");
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
  console.log(`compactTitle: ${compactTitle}`);
  console.log(`terms: ${terms}`);
  console.log(`definitions: ${definitions}`);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO studysets (user_id, title, date)
      VALUES ("410544b2-4001-4271-9855-fec4b6a6442a", ${title}, ${date})
      ON CONFLICT (set_id) DO NOTHING;
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to add Study Set to table.',
    };
  }

  // Create Study Set table
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS ${compactTitle} (
      term VARCHAR(255) NOT NULL,
      definition VARCHAR(255) NOT NULL
    );
    `
  } catch (error) {
    return {
      message: 'Database Error: Failed to create ${compactTitle} table',
    };
  }

  // Insert pairs into table
  try {
    await sql`
    INSERT INTO ${compactTitle} (term, definition)
    VALUES (${terms}, ${definitions})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to insert pairs into ${compactTitle} table',
    };
  }
 
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
