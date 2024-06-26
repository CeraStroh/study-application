const { db } = require('@vercel/postgres');
const {
  studysets,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        security_question VARCHAR(255),
        security_answer VARCHAR(255)
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (user_id, name, email, password, security_question, security_answer)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.security_question}, ${user.security_answer})
        ON CONFLICT (user_id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedStudySets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "studysets" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS studysets (
      set_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      terms VARCHAR[] NOT NULL,
      definitions VARCHAR[] NOT NULL,
      study_content VARCHAR[] NOT NULL
    );
  `;

    console.log(`Created "studysets" table`);

    // Insert data into the "studysets" table
    const insertedStudysets = await Promise.all(
      studysets.map(
        (studyset) => client.sql`
        INSERT INTO studysets (user_id, title, date, terms, definitions, study_content)
        VALUES (${studyset.user_id}, ${studyset.title}, ${studyset.date}, ${studyset.terms}, ${studyset.definitions}, ${studyset.study_content})
        ON CONFLICT (set_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedStudysets.length} study sets into studysets`);

    return {
      createTable,
      studysets: insertedStudysets,
    };
  } catch (error) {
    console.error('Error seeding study sets:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedStudySets(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});