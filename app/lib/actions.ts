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
    pairs: z.coerce
      .number()
      .gt(0, { message: 'Please enter a number greater than 0.' }),
    term: z.string({
      invalid_type_error: 'Please enter a term.',
    }),
    definition: z.string({
      invalid_type_error: 'Please enter a definition.',
    }),
    date: z.string(),
  });
   
const CreateStudySet = FormSchema.omit({ id: true, date: true });
//const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    set_id?: string[];
    title?: string[];
    pairs?: number;
    term?: string[];
    definition?: string[];
  };
  message?: string | null;
};
 
export async function createStudySet(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateStudySet.safeParse({
    title: formData.get('title'),
    pairs: formData.get('pairs'),
    term: formData.get('term'),
    definition: formData.get('definition'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Study Set.',
    };
  }
 
  // Prepare data for insertion into the database
  const { user_id, set_id, title, pairs } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO studysets (user_id, set_id, title, pairs, date)
      VALUES (${user_id}, ${set_id}, ${title}, ${pairs}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Study Set.',
    };
  }
 
  // Revalidate the cache for the home page and redirect the user.
  revalidatePath('/home');
  redirect('/home');
}

export async function createStudySetContent(prevState: State, formData: FormData) {
  
}

{/*export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  //throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
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
}*/}