# Uniquers Application

## Environment Setup

This application uses Supabase for data storage. To properly configure the connection to Supabase, you need to set up environment variables.

### Setting up Supabase Environment Variables

1. Create a `.env` file in the root directory of the project (if it doesn't exist already)
2. Add the following variables to the `.env` file:

```
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Replace `https://your-supabase-project-url.supabase.co` with your actual Supabase project URL
4. Replace `your-supabase-anon-key` with your actual Supabase anon key

You can find these values in your Supabase project dashboard:
- Go to your Supabase project
- Click on the "Settings" icon in the sidebar
- Select "API" from the settings menu
- Copy the "URL" and "anon/public" key values

### Database Schema

The application uses a `potential_customers` table with the following structure:

- `id` (uuid, primary key)
- `name` (text, required)
- `email` (text, required)
- `phone` (text, required)
- `telegram` (text, optional)
- `message` (text, optional)
- `subscribed` (boolean, defaults to true)
- `created_at` (timestamptz, defaults to now)

## Running the Application

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

3. Open the application in your browser at the URL shown in the terminal
