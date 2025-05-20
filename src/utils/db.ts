
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const createContactsTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        interests TEXT,
        newsletter BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } finally {
    client.release();
  }
};

export const saveContact = async (data: {
  name: string;
  email: string;
  company?: string;
  interests?: string;
  newsletter: boolean;
}) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO contacts (name, email, company, interests, newsletter)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.name, data.email, data.company, data.interests, data.newsletter]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
