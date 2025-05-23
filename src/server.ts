
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
`);

app.post('/api/subscribe', async (req, res) => {
  try {
    const { fullName, email, company, interests, keepUpdated } = req.body;
    
    if (!fullName || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required.' 
      });
    }
    
    await pool.query(
      'INSERT INTO subscribers (full_name, email, company, interests, keep_updated) VALUES ($1, $2, $3, $4, $5)',
      [fullName, email, company, interests, keepUpdated]
    );
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!' 
    });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to save your information.' 
    });
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred'
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
