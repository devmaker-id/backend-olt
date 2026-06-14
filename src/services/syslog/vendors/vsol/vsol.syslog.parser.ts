import { SyslogParser }
from '../../contracts/syslog-parser'

import { SyslogEvent }
from '../../core/syslog-event'

import { OnuStatusParser }
from './parsers/onu-status.parser'

import { LoginParser }
from './parsers/login.parser'

import { OnuDeregisterParser }
from './parsers/onu-deregister.parser'

export class VsolSyslogParser
implements SyslogParser {

  parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const parsers = [

      OnuStatusParser,

      LoginParser,

      OnuDeregisterParser

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

      timestamp:
        new Date(),

      rawLog: log,

      payload: {
        reason:
          'NO_MATCHING_PARSER'
      }

    }

  }

}