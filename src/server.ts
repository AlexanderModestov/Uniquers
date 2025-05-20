
import express from 'express';
import { createContactsTable, saveContact } from './utils/db';
import { ViteDevServer } from 'vite';
import cors from 'cors';
import { config } from 'dotenv';

config();
const app = express();
app.use(cors());
app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

export const createServer = async (vite?: ViteDevServer) => {
  // Initialize database
  await createContactsTable();

  // API routes
  app.post('/api/contacts', async (req, res) => {
    try {
      const { name, email, company, interests, newsletter } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const contact = await saveContact({ name, email, company, interests, newsletter });
      res.json({ success: true, message: 'Contact saved successfully', data: contact });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Serve Vite app
  if (vite) {
    app.use(vite.middlewares);
  }

  return app;
};

if (import.meta.env.PROD) {
  const app = await createServer();
  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on port 5000');
  });
} else {
  const app = await createServer();
  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on port 5000');
  });
}
