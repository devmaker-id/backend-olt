import { SyslogEvent } from '../../../core/syslog-event'

export class OnuParser {

  static parse(
    log: string,
    sourceIp: string
  ): SyslogEvent | null {

    const regex =
      /^.*?\s([A-Z0-9_\-]+):\s+\[(.*?)\]\s+ONU\s+(\d+\/\d+):(\d+)\s+\[\s*([0-9A-F:]+)\s*\]\s+\[(.*?)\]\s+(linkup|linkdown)/i

    const match = log.match(regex)

    if (!match) {
      return null
    }

    const status =
      match[7].toLowerCase()

    const onuName =
      match[6]?.trim()

    return {

      type: status === 'linkup'
          ? 'ONU_LINKUP'
          : 'ONU_LINKDOWN',

      oltName: match[1],

      timestamp: new Date(match[2]),

      portId: match[3],

      onuId: match[4],

      onuMac: match[5].toUpperCase(),

      onuName,

      sourceIp,

      rawLog: log,

      payload: {
        status
      }

    }
  }

}