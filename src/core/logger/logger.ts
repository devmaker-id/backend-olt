import pino from "pino"
import { env } from "../../config/env"

const isDevelopment = env.nodeEnv === "development"

export const logger = pino({
    base: {
        service: env.appName
    },
    level: env.logLevel,
    redact: [
        "password",
        "token",
        "accessToken",
        "refreshToken",
        "secret",
        "jwtSecret",
        "telegramBotToken"
    ],
    transport: isDevelopment
        ? {
            target: "pino-pretty",
            options: {
                colorsize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname"
            },
        }
        : undefined
})