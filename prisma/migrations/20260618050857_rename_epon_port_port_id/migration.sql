/*
  Warnings:

  - You are about to drop the column `eponPort` on the `UnauthorizedOnu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UnauthorizedOnu" DROP COLUMN "eponPort",
ADD COLUMN     "portId" TEXT,
ALTER COLUMN "onuId" DROP NOT NULL;
