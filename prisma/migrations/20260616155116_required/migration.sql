/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - Made the column `address` on table `Endpoint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Endpoint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telepon` on table `Endpoint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Endpoint" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "telepon" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_email_key" ON "Endpoint"("email");
