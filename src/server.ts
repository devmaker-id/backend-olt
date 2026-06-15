import app from './app'
import { env } from './config/env'
import { SyslogServer } from './services/syslog/core/syslog.server'
import { startSchedulers } from './bootstrap/start-schedulers'


async function bootstrap() {
  try {
    const syslogServer = new SyslogServer()
    const SYSLOG_PORT = env.syslogPort
    syslogServer.start(
      SYSLOG_PORT
    )
    if(env.scheduler){
      startSchedulers()
    }
    await app.listen({
      port: env.port,
      host: env.ipAddress
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()