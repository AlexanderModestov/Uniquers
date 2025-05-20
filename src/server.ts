
import express from 'express';
import { createContactsTable, saveContact } from './utils/db';
import { ViteDevServer } from 'vite';

const app = express();
app.use(express.json());

export const createServer = async (vite?: ViteDevServer) => {
  // Initialize database
  await createContactsTable();

  // API routes
  app.post('/api/contacts', async (req, res) => {
    try {
      const contact = await saveContact(req.body);
      res.json(contact);
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
