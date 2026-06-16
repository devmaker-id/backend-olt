/*
  Warnings:

  - Added the required column `type` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('HOTSPOT', 'PPP');

-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "packageId" TEXT;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "type" "PackageType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
