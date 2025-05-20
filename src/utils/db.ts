
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
        request VARCHAR(255),
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
  request: string;
}) => {
  console.log('Attempting to save contact:', data);
  const client = await pool.connect();
  try {
    console.log('Connected to database successfully');
    const result = await client.query(
      `INSERT INTO contacts (name, email, request)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.name, data.email, data.request]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};
