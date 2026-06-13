import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string().min(1),
  SYSLOG_PORT: z.coerce.number().default(514),
  SYSLOG_BIND_ADDRESS: z.string().default('0.0.0.0'),
  SYSLOG_STRICT_MODE: z.coerce.boolean().default(false),
  SYSLOG_ALLOWED_IPS: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1)
})

const parsed = envSchema.parse(process.env)

export const env = {
  port: parsed.PORT,
  jwtSecret: parsed.JWT_SECRET,
  syslogPort: parsed.SYSLOG_PORT,
  syslogBindAddress: parsed.SYSLOG_BIND_ADDRESS,
  syslogStrictMode: parsed.SYSLOG_STRICT_MODE,
  syslogAllowedIps: parsed.SYSLOG_ALLOWED_IPS ?? '',
  telegramBotToken: parsed.TELEGRAM_BOT_TOKEN,
  telegramChatId: parsed.TELEGRAM_CHAT_ID
}