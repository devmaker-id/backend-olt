import { SyslogEvent } from '../core/syslog-event'

export interface SyslogEventHandler {

  handle(
    event: SyslogEvent
  ): Promise<void>

}