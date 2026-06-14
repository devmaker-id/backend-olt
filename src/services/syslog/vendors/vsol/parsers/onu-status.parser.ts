import { SyslogEvent } from '../../../core/syslog-event'

export class OnuStatusParser {

  static parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const regex =
      /^<\d+>.*?\s([A-Z0-9\-_]+)\s+auditd\[\d+\]:\s+ONU\s+(Online|Offline)\s+PON\s+(\d+\/\d+)\s+ONU\s+(\d+)\s+sn\s+([A-Z0-9]+)\s+\./i

    const match = log.match(regex)
    if (!match) {
      return null
    }
    const status = match[2].toUpperCase()

    return {
      type: status === 'ONLINE' ? 'ONU_ONLINE' : 'ONU_OFFLINE',
      oltName: match[1],
      eponPort: match[3],
      onuId: match[4],
      serialNumber: match[5].toUpperCase(),
      sourceIp,
      timestamp: new Date(),
      rawLog: log,
      payload: {
        status: 'ONLINE',
        serialNumber: match[5],
        eponPort: match[3],
        onuId: match[4]
      }


    }

  }

}