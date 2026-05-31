/*
  Warnings:

  - Made the column `internetNo` on table `Endpoint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Endpoint" ALTER COLUMN "internetNo" SET NOT NULL;
