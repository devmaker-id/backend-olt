import { SyslogEvent } from '../core/syslog-event'

export interface SyslogParser {
  parse(
    rawLog: string,
    sourceIp: string
  ): SyslogEvent | null
}