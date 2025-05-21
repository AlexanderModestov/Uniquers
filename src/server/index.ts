import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uniquers',
  password: 'postgres',
  port: 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to database');
  release();
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    interests TEXT,
    keep_updated BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`).then(() => {
  console.log('Subscribers table created or already exists');
}).catch(err => {
  console.error('Error creating table:', err);
});

app.post('/api/submit-form', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { fullName, email, company, interests, keepUpdated } = req.body;
    
    if (!fullName || !email) {
      res.status(400).json({ 
        success: false, 
        message: 'Name and email are required.' 
      });
      return;
    }
    
    const result = await pool.query(
      'INSERT INTO subscribers (full_name, email, company, interests, keep_updated) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [fullName, email, company, interests, keepUpdated]
    );
    
    console.log('Successfully inserted:', result.rows[0]);
    
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!' 
    });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save your information.' 
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
