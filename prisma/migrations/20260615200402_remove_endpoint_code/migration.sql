/*
  Warnings:

  - You are about to drop the column `code` on the `Endpoint` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Endpoint_code_key";

-- AlterTable
ALTER TABLE "Endpoint" DROP COLUMN "code";
