import { SyslogParser } from './syslog-parser'
import { SyslogService } from './syslog-service'

export interface SyslogVendor {
  name: string
  parser: SyslogParser
  service: SyslogService
}