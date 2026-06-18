-- DropIndex
DROP INDEX "UnauthorizedOnu_macAddress_key";

-- AlterTable
ALTER TABLE "UnauthorizedOnu" ADD COLUMN     "serialNumber" TEXT,
ALTER COLUMN "macAddress" DROP NOT NULL;
