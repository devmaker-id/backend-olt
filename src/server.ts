import app from './app'
import { env } from './config/env'
import { SyslogServer } from './services/syslog/core/syslog.server'
import { telegramRouter } from './services/telegram/telegram.router'

async function bootstrap() {
  try {

    const syslogServer = new SyslogServer()

    const SYSLOG_PORT = 5140

    syslogServer.start(
      SYSLOG_PORT
    )

    app.register(
      telegramRouter
    )

    console.log(
      `SYSLOG RUNNING : ${SYSLOG_PORT}`
    )

    await app.listen({
      port: env.port,
      host: '0.0.0.0'
    })

    console.log(`API RUNNING : ${env.port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()