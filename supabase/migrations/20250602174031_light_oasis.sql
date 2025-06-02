/*
  # Create potential customers table

  1. New Tables
    - `potential_customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `telegram` (text, optional)
      - `message` (text, optional)
      - `subscribed` (boolean, defaults to true)
      - `created_at` (timestamptz, defaults to now)
  2. Indexes
    - Email index for faster lookups
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