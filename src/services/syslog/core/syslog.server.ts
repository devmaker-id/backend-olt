import dgram from 'dgram'
import { env } from '../../../config/env'
import { SyslogIpFilter } from './syslog-ip-filter'
import { SyslogDispatcher } from './syslog.dispatcher'

export class SyslogServer {
  private server = dgram.createSocket('udp4')
  start(
    port: number
  ) {

    this.server.on('listening', () => {
      const address = this.server.address()
      console.log(JSON.stringify({
        syslogListen: `${address.address}:${address.port}`
      }))
    })

    this.server.on('message',
      async (
        message,
        remote
      ) => {

      try {
        const log = message.toString()
        const allowedIps = env.syslogAllowedIps.split(',').map(
          ip => ip.trim()
        ).filter(Boolean)
        if(!SyslogIpFilter.isAllowed(
          remote.address,
          allowedIps
        )) {
          console.log(`SYSLOG BLOCKED ${remote.address}`)
          return
        }
        console.log(
          `SYSLOG FROM ${remote.address}\n`
        )
        console.log(log)
        await SyslogDispatcher.dispatch(
          log,
          remote.address
        )
      }
      catch (error) {
        console.error(
          'SYSLOG ERROR',
          error
        )
      }
    })

    this.server.bind(
      port,
      env.syslogBindAddress
    )
  }
}