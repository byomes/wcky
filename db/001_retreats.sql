-- Retreat listings: discovered by Watson, browsed/saved by the family.
CREATE TABLE IF NOT EXISTS retreats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  distance_miles NUMERIC,
  drive_time TEXT,
  price TEXT,
  capacity TEXT,
  beds TEXT,
  baths TEXT,
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  kitchen_status TEXT CHECK (kitchen_status IN ('yes', 'no', 'unclear')),
  kitchen_detail TEXT,
  fit_rating TEXT CHECK (fit_rating IN ('good', 'warn', 'bad')),
  fit_label TEXT,
  notes TEXT,
  phone TEXT,
  website TEXT,
  email TEXT,
  source_url TEXT UNIQUE,
  free_or_paid TEXT CHECK (free_or_paid IN ('free', 'paid')),
  date_added TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'candidate' CHECK (status IN ('candidate', 'saved', 'starred', 'archived')),
  added_by TEXT NOT NULL CHECK (added_by IN ('watson', 'manual'))
);

CREATE INDEX IF NOT EXISTS idx_retreats_status ON retreats (status);
CREATE INDEX IF NOT EXISTS idx_retreats_fit_rating ON retreats (fit_rating);
