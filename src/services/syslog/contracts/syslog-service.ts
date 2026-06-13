import { SyslogEvent } from '../core/syslog-event'

export interface SyslogService {
  process(
    event: SyslogEvent
  ): Promise<void>
}