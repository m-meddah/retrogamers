-- Revert retrogamers:02add_systems from pg

BEGIN;

DELETE FROM "system" CASCADE;

COMMIT;
