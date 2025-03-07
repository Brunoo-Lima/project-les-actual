/*
  Warnings:

  - Made the column `identifier` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "identifierDelivery" DROP NOT NULL,
ALTER COLUMN "identifier" SET NOT NULL;
