/*
  Warnings:

  - You are about to drop the column `onuCommName` on the `UnauthorizedOnu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Onu" ADD COLUMN     "onuComtName" TEXT;

-- AlterTable
ALTER TABLE "UnauthorizedOnu" DROP COLUMN "onuCommName",
ADD COLUMN     "onuComtName" TEXT;
