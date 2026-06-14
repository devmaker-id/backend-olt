import { SyslogVendor } from '../../contracts/syslog-vendor'
import { HisfocusSyslogParser } from './hioso.syslog.parser'
import { HisfocusSyslogService } from './hioso.syslog.service'

export const hisfocusVendor: SyslogVendor = {
  name: 'hisfocus',
  parser: new HisfocusSyslogParser(),
  service: new HisfocusSyslogService()
}