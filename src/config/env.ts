import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET!,
  syslogStrictMode: process.env.SYSLOG_STRICT_MODE === 'true',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN!,
  telegramChatId: process.env.TELEGRAM_CHAT_ID!,
}