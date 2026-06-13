import { SyslogParser }
  from '../../contracts/syslog-parser'

import { SyslogEvent }
  from '../../core/syslog-event'

import { OnuParser } from './parsers/onu.parser'

import { WebParser }
  from './parsers/web.parser'

export class HisfocusSyslogParser
implements SyslogParser {

  parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const parsers = [

      OnuParser,

      WebParser

    ]

    for (const parser of parsers) {

      const event =
        parser.parse(
          log,
          sourceIp
        )

      if (event) {
        return event
      }

    }

    return {

      type: 'UNKNOWN',

      oltName: 'UNKNOWN',

      sourceIp,

      timestamp: new Date(),

      rawLog: log,

      payload: {
        reason: 'NO_MATCHING_PARSER'
      }

    }

  }

}