import { SyslogEvent } from '../../../core/syslog-event'

export class OnuDeregisterParser {

  static parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const match =
      log.match(
        /([A-Z0-9\-_]+)\s+auditd\[\d+\]:\s+ONU Deregister\s+delete PON\s+(\d+\/\d+)\s+ONU\s+(\d+)/i
      )

    if (!match) {
      return null
    }

    return {

      type: 'ONU_UNREGISTER',

      oltName:
        match[1],

      eponPort:
        match[2],

      onuId:
        match[3],

      sourceIp,

      timestamp:
        new Date(),

      rawLog:
        log,

      payload: {

        action:
          'DELETE_ONU',

        eponPort:
          match[2],

        onuId:
          match[3]

      }

    }

  }

}