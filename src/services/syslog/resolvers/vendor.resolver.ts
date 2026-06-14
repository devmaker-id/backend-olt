import { SyslogParser }
from '../contracts/syslog-parser'

import { SyslogService }
from '../contracts/syslog-service'

import { HisfocusSyslogParser }
from '../vendors/hioso/hioso.syslog.parser'

import { HisfocusSyslogService }
from '../vendors/hioso/hioso.syslog.service'

import { VsolSyslogParser }
from '../vendors/vsol/vsol.syslog.parser'

import { VsolSyslogService }
from '../vendors/vsol/vsol.syslog.service'

interface VendorDefinition {

  parser: SyslogParser

  service: SyslogService

}

export class VendorResolver {

  static resolve(
    vendor: string
  ): VendorDefinition {

    switch (
      vendor.toUpperCase()
    ) {

      case 'HISFOCUS':

        return {

          parser:
            new HisfocusSyslogParser(),

          service:
            new HisfocusSyslogService()

        }

      case 'VSOL':

        return {

          parser:
            new VsolSyslogParser(),

          service:
            new VsolSyslogService()

        }

      default:

        throw new Error(
          `UNSUPPORTED VENDOR ${vendor}`
        )

    }

  }

}