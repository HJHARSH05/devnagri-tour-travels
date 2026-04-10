-- Migration: Increase bookings.Name length to support long package and taxi names
-- Created: 2026-04-10
-- Up: increase Name size from varchar(50) to varchar(255)
ALTER TABLE bookings
ALTER COLUMN "Name" TYPE varchar(255);
-- Down: revert Name size to varchar(50)
-- WARNING: rollback will fail if values longer than 50 already exist.
-- ALTER TABLE bookings
-- ALTER COLUMN "Name" TYPE varchar(50);