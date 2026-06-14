/*
  Warnings:

  - You are about to drop the column `telnetPort` on the `Olt` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OltPlatform" AS ENUM ('HIOSO', 'VSOL');

-- CreateEnum
CREATE TYPE "OltConnectionType" AS ENUM ('TELNET', 'SSH', 'API', 'SNMP');

-- AlterTable
ALTER TABLE "Olt" DROP COLUMN "telnetPort",
ADD COLUMN     "connectionType" "OltConnectionType",
ADD COLUMN     "managementPort" INTEGER NOT NULL DEFAULT 23,
ADD COLUMN     "platform" "OltPlatform";
