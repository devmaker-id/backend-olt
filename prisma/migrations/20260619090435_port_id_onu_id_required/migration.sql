/*
  Warnings:

  - Made the column `onuId` on table `Onu` required. This step will fail if there are existing NULL values in that column.
  - Made the column `portId` on table `Onu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Onu" ALTER COLUMN "onuId" SET NOT NULL,
ALTER COLUMN "portId" SET NOT NULL;
