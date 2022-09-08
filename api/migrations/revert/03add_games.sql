-- Revert retrogamers:03add_games from pg

BEGIN;

DELETE FROM "game" CASCADE;

COMMIT;
