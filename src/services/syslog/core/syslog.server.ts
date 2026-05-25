import dgram from 'dgram'

import {
  HisfocusSyslogParser
} from '../vendors/hisfocus/hisfocus.syslog.parser'

import {
  HisfocusSyslogService
} from '../vendors/hisfocus/hisfocus.syslog.service'

export class SyslogServer {

  private server =
    dgram.createSocket('udp4')

  start(
    port: number
  ) {

    this.server.on(
      'listening',
      () => {

      const address =
        this.server.address()

      console.log(
        `SYSLOG SERVER RUNNING ${address.address}:${address.port}`
      )
    })

    this.server.on(
      'message',
      async (
        message,
        remote
      ) => {

      try {

        const log =
          message.toString()

        console.log(
          `SYSLOG FROM ${remote.address}`
        )

        console.log(log)

        const parsed =
          HisfocusSyslogParser
            .parse(log, remote.address)

        if (!parsed) {

          console.log(
            'INVALID SYSLOG FORMAT'
          )

          return
        }

        await HisfocusSyslogService
          .process(parsed)

      }

      catch (error) {

        console.error(
          'SYSLOG ERROR',
          error
        )
      }
    })

    this.server.bind(port)
  }
}