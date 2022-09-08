-- Revert retrogamers:07fix_table_col_has_system from pg

BEGIN;

ALTER TABLE "collection_has_system_and_game"
ALTER COLUMN "system_id" SET NOT NULL;

COMMIT;
