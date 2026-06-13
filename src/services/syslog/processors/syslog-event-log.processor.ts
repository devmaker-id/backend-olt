import { prisma } from '../../../config/prisma'
import { SyslogEvent } from '../core/syslog-event'

export class SyslogEventLogProcessor {

  static async save(
    event: SyslogEvent
  ) {

    try {
        await prisma.syslogEventLog.create({
            data: {
                type: event.type,
                sourceIp: event.sourceIp,
                oltName: event.oltName,
                eponPort: event.eponPort,
                onuId: event.onuId,
                onuMac: event.onuMac,
                onuName: event.onuName,
                rawLog: event.rawLog,
                payload: JSON.stringify(event.payload)

            }
        })
    } catch(error) {
        console.log('FILED SAVE SYSLOG EVENT', error)
    }

  }

}