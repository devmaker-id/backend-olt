-- CreateTable
CREATE TABLE "TelegramAccessLog" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "message" TEXT,
    "chatType" TEXT,
    "isAuthorized" BOOLEAN NOT NULL,
    "telegramBotId" TEXT,
    "rawUpdate" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramAccessLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TelegramAccessLog" ADD CONSTRAINT "TelegramAccessLog_telegramBotId_fkey" FOREIGN KEY ("telegramBotId") REFERENCES "TelegramBot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
