import { SyslogVendor } from '../../contracts/syslog-vendor'
import { HisfocusSyslogParser } from './hisfocus.syslog.parser'
import { HisfocusSyslogService } from './hisfocus.syslog.service'

export const hisfocusVendor: SyslogVendor = {
  name: 'hisfocus',
  parser: new HisfocusSyslogParser(),
  service: new HisfocusSyslogService()
}