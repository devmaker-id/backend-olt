/*
  Warnings:

  - You are about to drop the column `eponPort` on the `Onu` table. All the data in the column will be lost.
  - You are about to drop the column `eponPort` on the `SyslogEventLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[oltId,portId,onuId]` on the table `Onu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Onu_oltId_eponPort_onuId_key";

-- DropIndex
DROP INDEX "Onu_onuMac_key";

-- AlterTable
ALTER TABLE "Onu" DROP COLUMN "eponPort",
ADD COLUMN     "portId" TEXT,
ALTER COLUMN "onuId" DROP NOT NULL,
ALTER COLUMN "onuMac" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SyslogEventLog" DROP COLUMN "eponPort",
ADD COLUMN     "portId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Onu_oltId_portId_onuId_key" ON "Onu"("oltId", "portId", "onuId");
