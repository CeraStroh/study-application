const { db } = require('@vercel/postgres');
const {
  studysets,
  users,
  MidwestUSCapitals,
  COSCClasses,
  FinancialAccountingExam1,
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
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (user_id, name, email, password)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
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
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    set_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    pairs INT NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "studysets" table`);

    // Insert data into the "studysets" table
    const insertedStudysets = await Promise.all(
      studysets.map(
        (studysets) => client.sql`
        INSERT INTO studysets (user_id, set_id, title, pairs, date)
        VALUES (${studysets.user_id}, ${studysets.set_id}, ${studysets.title}, ${studysets.pairs} ${studysets.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedStudysets.length} study sets`);

    return {
      createTable,
      studysets: insertedStudysets,
    };
  } catch (error) {
    console.error('Error seeding study sets:', error);
    throw error;
  }
}

async function seedMidwestUSCapitals(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the first set table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS midwestuscapitals (
    term VARCHAR(255) NOT NULL,
    definition VARCHAR(255) NOT NULL,
  );
`;

    console.log(`Created "midwestuscapitals" table`);

    // Insert data into the "midwestuscapitals" table
    const insertedMidwestUSCapitals = await Promise.all(
      midwestuscapitals.map(
        (midwestuscapitals) => client.sql`
        INSERT INTO midwestuscapitals (term, definition)
        VALUES (${midwestuscapitals.term}, ${midwestuscapitals.definition})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMidwestUSCapitals.length} MidwestUSCapitals`);

    return {
      createTable,
      midwestuscapitals: insertedMidwestUSCapitals,
    };
  } catch (error) {
    console.error('Error seeding MidwestUSCapitals:', error);
    throw error;
  }
}

async function seedCOSCClasses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the second set table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS coscclasses (
    term VARCHAR(255) NOT NULL,
    definition VARCHAR(255) NOT NULL,
  );
`;

    console.log(`Created "coscclasses" table`);

    // Insert data into the "coscclasses" table
    const insertedCOSCClasses = await Promise.all(
      coscclasses.map(
        (coscclasses) => client.sql`
        INSERT INTO coscclasses (term, definition)
        VALUES (${coscclasses.term}, ${coscclasses.definition})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCOSCClasses.length} COSCClasses`);

    return {
      createTable,
      coscclasses: insertedCOSCClasses,
    };
  } catch (error) {
    console.error('Error seeding COSCClasses:', error);
    throw error;
  }
}

async function seedFinancialAccountingExam1(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the third set table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS financialaccountingexam1 (
    term VARCHAR(255) NOT NULL,
    definition VARCHAR(255) NOT NULL,
  );
`;

    console.log(`Created "financialaccountingexam1" table`);

    // Insert data into the "financialaccountingexam1" table
    const insertedFinancialAccountingExam1 = await Promise.all(
      financialaccountingexam1.map(
        (financialaccountingexam1) => client.sql`
        INSERT INTO financialaccountingexam1 (term, definition)
        VALUES (${financialaccountingexam1.term}, ${financialaccountingexam1.definition})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedFinancialAccountingExam1.length} financial accounting`);

    return {
      createTable,
      financialaccountingexam1: insertedFinancialAccountingExam1,
    };
  } catch (error) {
    console.error('Error seeding FinancialAccountingExam1:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedStudySets(client);
  await seedMidwestUSCapitals(client);
  await seedCOSCClasses(client);
  await seedFinancialAccountingExam1(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});