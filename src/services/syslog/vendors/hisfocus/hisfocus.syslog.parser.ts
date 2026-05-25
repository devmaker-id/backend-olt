import {
  ParsedSyslog
} from '../../core/syslog.types'

export class HisfocusSyslogParser {

  static parse(
    log: string,
    sourceIp: string
  ): ParsedSyslog | null {

    const regex = /^.*?\s([A-Z0-9_\\-]+):\s+\[(.*?)\]\s+ONU\s+(\d+\/\d+):(\d+)\s+\[\s*([0-9A-F:]+)\s*\]\s+\[(.*?)\]\s+(linkup|linkdown)/i

    const match =
      log.match(regex)

    if (!match) {
      return null
    }

    const onuName = match[5]?.trim()

    return {
      oltName: match[1],
      timestamp: match[2],
      eponPort: match[3],
      onuId: match[4],
      onuMac: match[5].toUpperCase(),
      onuName: onuName === 'Na' ? null : onuName,
      status: match[7] as 'linkup' | 'linkdown',
      isRegistered: onuName !== 'Na',
      sourceIp,
      raw: log
    }

  }
}