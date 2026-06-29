import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()
const booleanString = z.enum(['true', 'false']).transform(v => v === 'true')

const envSchema = z.object({
  APP_NAME: z.string().default("OLT-BACKEND"),
  NODE_ENV: z.enum([
    "development",
    "production",
    "test"
  ]),
  PORT: z.coerce.number().default(8000),
  JWT_SECRET: z.string().min(1),
  IP_ADDRESS: z.string().default('0.0.0.0'),
  SYSLOG_PORT: z.coerce.number().default(514),
  SYSLOG_BIND_ADDRESS: z.string().default('0.0.0.0'),
  SYSLOG_STRICT_MODE: booleanString.default('false'),
  SYSLOG_ALLOWED_IPS: z.string().optional(),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
  LOG_LEVEL: z.enum([
    "trace",
    "debug",
    "info",
    "error",
    "fatal"
  ]),
  SCHEDULER: booleanString.default('false'),
  SCHEDULER_CRON: z.string().default('0 */5 * * *'),
})

const parsed = envSchema.parse(process.env)

export const env = Object.freeze({
  appName: parsed.APP_NAME,
  nodeEnv: parsed.NODE_ENV,
  ipAddress: parsed.IP_ADDRESS,
  port: parsed.PORT,
  jwtSecret: parsed.JWT_SECRET,
  syslogPort: parsed.SYSLOG_PORT,
  syslogBindAddress: parsed.SYSLOG_BIND_ADDRESS,
  syslogStrictMode: parsed.SYSLOG_STRICT_MODE,
  syslogAllowedIps: parsed.SYSLOG_ALLOWED_IPS ?? '',
  telegramBotToken: parsed.TELEGRAM_BOT_TOKEN,
  telegramChatId: parsed.TELEGRAM_CHAT_ID,
  logLevel: parsed.LOG_LEVEL,
  scheduler: parsed.SCHEDULER,
  schedulerCron: parsed.SCHEDULER_CRON,
})