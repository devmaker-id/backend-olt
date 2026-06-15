/*
  Warnings:

  - Made the column `alamat` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telegramId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telepon` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "alamat" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "telegramId" SET NOT NULL,
ALTER COLUMN "telepon" SET NOT NULL;
