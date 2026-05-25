/*
  Warnings:

  - A unique constraint covering the columns `[internetNo]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "internetNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_internetNo_key" ON "Endpoint"("internetNo");
