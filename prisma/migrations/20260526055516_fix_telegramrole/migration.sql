/*
  Warnings:

  - The `role` column on the `TelegramUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TelegramRole" AS ENUM ('ADMIN', 'TEKNISI');

-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "role",
ADD COLUMN     "role" "TelegramRole" NOT NULL DEFAULT 'TEKNISI';
