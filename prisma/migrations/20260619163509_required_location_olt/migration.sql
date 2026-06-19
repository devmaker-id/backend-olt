/*
  Warnings:

  - Made the column `location` on table `Olt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Olt" ALTER COLUMN "location" SET NOT NULL;
