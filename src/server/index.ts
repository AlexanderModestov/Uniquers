import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://80b41d26-52e4-495f-98b3-622efa33fec0-00-2ydcycu2n5f8x.riker.replit.dev'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());

// Database connection with fallback
let pool: Pool | null = null;
let dbConnected = false;

try {
  // Use DATABASE_URL if available, otherwise fall back to individual connection parameters
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  } else {
    pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'uniquers',
      password: process.env.DB_PASSWORD || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });
  }

  // Test database connection
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      console.log('Running without database - submissions will be logged only');
      dbConnected = false;
      return;
    }
    console.log('Successfully connected to database');
    dbConnected = true;
    release();
  });
} catch (error) {
  console.error('Failed to initialize database pool:', error);
  console.log('Running without database - submissions will be logged only');
  dbConnected = false;
}

// Create table if not exists (only if database is connected)
if (pool && dbConnected) {
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
    dbConnected = false;
  });
}

app.post('/api/submit-form', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('Received request body:', req.body);
    const { fullName, email, company, interests, keepUpdated } = req.body;
    
    if (!fullName || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required.' 
      });
    }
    
    if (pool && dbConnected) {
      const result = await pool.query(
        'INSERT INTO subscribers (full_name, email, company, interests, keep_updated) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [fullName, email, company, interests, keepUpdated]
      );
      
      console.log('Successfully inserted:', result.rows[0]);
    } else {
      // Fallback: just log the submission
      console.log('Database not available - logging submission:', {
        fullName,
        email,
        company,
        interests,
        keepUpdated,
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!' 
    });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to save your information.' 
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.setHeader('Content-Type', 'application/json');
  return res.status(500).json({
    success: false,
    message: 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});