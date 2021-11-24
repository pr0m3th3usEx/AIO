/*
  Warnings:

  - The values [INTRA] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - The values [INTRA] on the enum `WidgetType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('GOOGLE', 'WEATHER', 'CRYPTO', 'INTRANET', 'TWITTER', 'REDDIT');
ALTER TABLE "Service" ALTER COLUMN "type" TYPE "ServiceType_new" USING ("type"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WidgetType_new" AS ENUM ('TRANSLATOR', 'CITY_TEMPERATURE', 'CRYPTO', 'INTRA_INFO', 'USER_TWEETS', 'SUBREDDIT');
ALTER TABLE "Widget" ALTER COLUMN "type" TYPE "WidgetType_new" USING ("type"::text::"WidgetType_new");
ALTER TYPE "WidgetType" RENAME TO "WidgetType_old";
ALTER TYPE "WidgetType_new" RENAME TO "WidgetType";
DROP TYPE "WidgetType_old";
COMMIT;
