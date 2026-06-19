/*
  Warnings:

  - You are about to drop the column `packageId` on the `Onu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Onu" DROP CONSTRAINT "Onu_packageId_fkey";

-- AlterTable
ALTER TABLE "Onu" DROP COLUMN "packageId";
