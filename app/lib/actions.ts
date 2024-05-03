'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
const bcrypt = require('bcrypt');

const FormSchema = z.object({
  user_id: z.string(),
  set_id: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  terms: z.coerce.string(),
  definitions: z.coerce.string(),
  study_content: z.coerce.string(),
  date: z.string(),
});

const AuthSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.coerce.string(),
  security_question: z.string(),
  security_answer: z.string(),
});

const CreateStudySet = FormSchema.omit({ user_id: true, set_id: true, date: true });
const UpdateStudySet = FormSchema.omit({ user_id: true, set_id: true, date: true });
const CreateUser = AuthSchema.omit({ user_id: true });

export type State = {
  errors?: {
    title?: string[];
    terms?: object[];
    definitions?: object[];
    study_content?: object[];
  };
  message?: string | null;
};
 
export async function createStudySet(formData: FormData) {
  console.log(`Running createStudySet()`);
  //Validate form using Zod
  const { title, terms, definitions, study_content } = CreateStudySet.parse({
    title: formData.get('title'),
    terms: formData.getAll('term'),
    definitions: formData.getAll('definition'),
    study_content: formData.get('study_content'),
  });
  const session = await auth();
  const user_id = session?.user?.id;
  const date = new Date().toISOString().split('T')[0];
  // console.log(`after validatedFields`);
  // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   console.log(`in unusccessful validatedFields`);
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Create Study Set.',
  //   };
  // }
  // console.log(`before preparing data`);
  // Prepare data for insertion into the database
  // const { title, terms, definitions } = validatedFields.data;
  // Insert data into the database
  try {
    await sql`
      INSERT INTO studysets (user_id, title, date, terms, definitions, study_content)
      VALUES (${user_id}, ${title}, ${date}, ARRAY[${terms}], ARRAY[${definitions}], ARRAY[${study_content}])
      ON CONFLICT (set_id) DO NOTHING;
    `;
    console.log(`Added ${title} to studysets table`);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to add Study Set to table.',
    };
  }

  // Revalidate the cache for the home page and redirect the user.
  revalidatePath('/home');
  redirect('/home');
}

export async function updateStudySet(set_id: string, formData: FormData) {
  const { title, terms, definitions, study_content } = UpdateStudySet.parse({
    title: formData.get('title'),
    terms: formData.getAll('term'),
    definitions: formData.getAll('definition'),
    study_content: formData.get('study_content'),
  });

  await sql`
    UPDATE studysets
    SET title = ${title}, terms = ARRAY[${terms}], definitions = ARRAY[${definitions}], study_content = ARRAY[${study_content}]
    WHERE set_id = ${set_id}
  `;

  revalidatePath('/home');
  redirect('/home');
}

export async function deleteStudySet(set_id: string) {
  await sql`DELETE FROM studysets WHERE set_id = ${set_id}`;
  console.log(`Deleted ${set_id} from studysets table`);
  revalidatePath('/home');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(formData: FormData) {
  const { name, email, password, security_question, security_answer } = CreateUser.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    security_question: formData.get('security_question'),
    security_answer: formData.get('security_answer'),
  });
  
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`name: ${name}`);
  console.log(`email: ${email}`);
  // console.log(`hashedPassword: ${hashedPassword}`);
  console.log(`security_question: ${security_question}`);
  console.log(`security_answer: ${security_answer}`);

  try {
    await sql`
      INSERT INTO users (name, email, password, security_question, security_answer)
      VALUES (${name}, ${email}, ${hashedPassword}, ${security_question}, ${security_answer})
      ON CONFLICT (user_id) DO NOTHING;
    `;
    console.log(`Added ${name} to users table`);
  } catch (error) {
    return {
      message: 'Database Error: Failed to add user.',
    };
  }

  revalidatePath('/login');
  redirect('/login');
}

export async function createTest(formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    terms: formData.getAll('term'),
    definitions: formData.getAll('definition'),
  };
  // Test it out:
  console.log(rawFormData);
  // console.log(typeof rawFormData.title);
  // console.log(typeof rawFormData.terms);
  // console.log(typeof rawFormData.definitions);
  redirect('/home');
}