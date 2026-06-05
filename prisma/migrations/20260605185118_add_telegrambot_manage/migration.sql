-- AlterTable
ALTER TABLE "TelegramUser" ADD COLUMN     "telegramBotId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TelegramBot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "token" TEXT NOT NULL,
    "webhookUrl" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramBot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_telegramBotId_fkey" FOREIGN KEY ("telegramBotId") REFERENCES "TelegramBot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
