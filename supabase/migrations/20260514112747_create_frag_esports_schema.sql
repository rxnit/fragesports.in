/*
  # Frag eSports Database Schema

  1. New Tables
    - `team_members` - Store team player information
      - `id` (uuid, primary key)
      - `name` (text) - Player name/alias
      - `role` (text) - Player role (e.g., Duelist, Sentinel, Controller)
      - `image_url` (text) - Profile image URL
      - `bio` (text) - Player bio
      - `created_at` (timestamp)
    
    - `matches` - Store upcoming and past matches
      - `id` (uuid, primary key)
      - `title` (text) - Match title
      - `opponent` (text) - Opponent team name
      - `game` (text) - Game title (Valorant, CS2, etc.)
      - `scheduled_at` (timestamp) - Match date and time
      - `status` (text) - upcoming, live, completed
      - `created_at` (timestamp)
    
    - `partners` - Store sponsor/partner information
      - `id` (uuid, primary key)
      - `name` (text) - Partner name
      - `logo_url` (text) - Partner logo URL
      - `category` (text) - Partner category (sponsor, equipment, etc.)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access (matches and team members are public)
    - Admin-only write access (managed via JWT)
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  opponent text NOT NULL,
  game text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  status text DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read team members"
  ON team_members FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read matches"
  ON matches FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read partners"
  ON partners FOR SELECT
  TO public
  USING (true);
