/*
  # Create potential customers table

  1. New Tables
    - `potential_customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `message` (text, optional)
      - `subscribed` (boolean, defaults to true)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `potential_customers` table
    - Add policy for inserting data
*/

CREATE TABLE IF NOT EXISTS potential_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE potential_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert potential customers"
  ON potential_customers
  FOR INSERT
  TO public
  WITH CHECK (true);