/*
  # Create potential customers table

  1. New Tables
    - `potential_customers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `telegram` (text, optional)
      - `message` (text, optional)
      - `subscribed` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `potential_customers` table
    - Add policy for anonymous inserts
*/

CREATE TABLE IF NOT EXISTS potential_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  telegram text,
  message text,
  subscribed boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS potential_customers_email_idx ON potential_customers(email);

-- Enable Row Level Security
ALTER TABLE potential_customers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON potential_customers
  FOR INSERT
  TO anon
  WITH CHECK (true);