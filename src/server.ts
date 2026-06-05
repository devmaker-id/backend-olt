import app from './app'
import { env } from './config/env'
import { SyslogServer } from './services/syslog/core/syslog.server'
import { telegramRouter } from './services/telegram/telegram.router'
import { startSchedulers } from './bootstrap/start-schedulers'


async function bootstrap() {
  try {

    const syslogServer = new SyslogServer()

    const SYSLOG_PORT = env.syslogPort

    syslogServer.start(
      SYSLOG_PORT
    )

    app.register(
      telegramRouter
    )
    
    //START RECONCILEONU
    //startSchedulers()

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