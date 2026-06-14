/*
  Warnings:

  - Made the column `connectionType` on table `Olt` required. This step will fail if there are existing NULL values in that column.
  - Made the column `platform` on table `Olt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Olt" ALTER COLUMN "connectionType" SET NOT NULL,
ALTER COLUMN "platform" SET NOT NULL;
