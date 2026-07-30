import dgram from 'dgram'
import { env } from '../../../config/env'
import { logger } from '../../../core/logger'
import { SyslogIpFilter } from './syslog-ip-filter'
import { SyslogDispatcher } from './syslog.dispatcher'

export class SyslogServer {
  private server = dgram.createSocket('udp4')
  private readonly allowedIps = env.syslogAllowedIps.split(',').map(
    ip => ip.trim()
  ).filter(Boolean)

  start(
    port: number
  ) {

    this.server.on('listening', () => {
      const address = this.server.address()
      logger.info(
        {
          syslogListen: `${address.address}:${address.port}`
        },
        'Syslog server startted'
      )
    })

    this.server.on('message',
      async (
        message,
        remote
      ) => {

      try {
        const log = message.toString()
        if(!SyslogIpFilter.isAllowed(
          remote.address,
          this.allowedIps
        )) {
          logger.warn(
            {
              ip: remote.address
            },
            'Syslog Blocked!'
          )
          return
        }
        logger.debug(
          {
            ip: remote.address,
            log
          },
          'Syslog received'
        )
        await SyslogDispatcher.dispatch(
          log,
          remote.address
        )
      }
      catch (error) {
        logger.error(
          {
            err: error,
            ip: remote.address
          },
          'Syslog procesing failed'
        )
      }
    })

    this.server.bind(
      port,
      env.syslogBindAddress
    )
  }
}