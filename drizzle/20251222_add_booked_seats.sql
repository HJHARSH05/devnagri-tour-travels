-- Migration: Add BookedSeats column to taxi_bookings
-- Created: 2025-12-22

-- Up: add column
ALTER TABLE taxi_bookings
ADD COLUMN IF NOT EXISTS "BookedSeats" varchar(500);

-- Down: remove column
-- (Uncomment to rollback)
-- ALTER TABLE taxi_bookings
-- DROP COLUMN IF EXISTS "BookedSeats";
