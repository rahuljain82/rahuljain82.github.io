-- ============================================================
-- Running Ninjas — Race Volunteering Setup
-- Run this script in your Supabase SQL Editor (once)
-- ============================================================

-- 1. Create race_volunteering table
-- Stores per-race, per-runner volunteering data entered by the admin.
CREATE TABLE IF NOT EXISTS race_volunteering (
  id                 SERIAL PRIMARY KEY,
  race_name          TEXT    NOT NULL,
  runner_unique_id   TEXT    NOT NULL REFERENCES runners(unique_id) ON DELETE CASCADE,
  participation_count INTEGER NOT NULL DEFAULT 0,
  volunteer_score    NUMERIC(10, 2) NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT race_volunteering_unique UNIQUE (race_name, runner_unique_id)
);

-- 2. Enable Row Level Security
ALTER TABLE race_volunteering ENABLE ROW LEVEL SECURITY;

-- Allow anon to read (needed by volunteer_scorecard page and admin panel)
CREATE POLICY "race_volunteering_select" ON race_volunteering
  FOR SELECT USING (true);

-- Allow anon to insert/update/delete (admin panel uses anon key)
CREATE POLICY "race_volunteering_insert" ON race_volunteering
  FOR INSERT WITH CHECK (true);

CREATE POLICY "race_volunteering_update" ON race_volunteering
  FOR UPDATE USING (true);

CREATE POLICY "race_volunteering_delete" ON race_volunteering
  FOR DELETE USING (true);

-- 3. Create volunteer_scorecard_view
-- Aggregates participation_count and volunteer_score across all races per runner.
-- Score = total_volunteer_score / total_participation_count (0 if no participation).
CREATE OR REPLACE VIEW volunteer_scorecard_view AS
SELECT
  r.unique_id,
  r.first_name || COALESCE(' ' || NULLIF(TRIM(r.last_name), ''), '') AS full_name,
  COALESCE(SUM(rv.participation_count), 0)::integer          AS total_participation,
  COALESCE(ROUND(SUM(rv.volunteer_score)::numeric, 2), 0.00) AS total_volunteer_score,
  CASE
    WHEN COALESCE(SUM(rv.participation_count), 0) = 0 THEN 0
    ELSE ROUND(
      SUM(rv.volunteer_score)::numeric / SUM(rv.participation_count)::numeric,
      4
    )
  END AS score
FROM runners r
LEFT JOIN race_volunteering rv ON r.unique_id = rv.runner_unique_id
GROUP BY r.unique_id, r.first_name, r.last_name;

-- 4. Grant anon read access to the view (needed by volunteer_scorecard.html)
GRANT SELECT ON volunteer_scorecard_view TO anon;

-- Done!
-- The admin panel Race Volunteering section uses the race_volunteering table directly.
-- The volunteer_scorecard.html page reads from volunteer_scorecard_view.
