/*
  Warnings:

  - The values [GOOGLE,WEATHER] on the enum `WidgetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WidgetType_new" AS ENUM ('TRANSLATOR', 'CITY_TEMPERATURE', 'CRYPTO', 'INTRA', 'TWITTER', 'REDDIT');
ALTER TABLE "Widget" ALTER COLUMN "type" TYPE "WidgetType_new" USING ("type"::text::"WidgetType_new");
ALTER TYPE "WidgetType" RENAME TO "WidgetType_old";
ALTER TYPE "WidgetType_new" RENAME TO "WidgetType";
DROP TYPE "WidgetType_old";
COMMIT;
