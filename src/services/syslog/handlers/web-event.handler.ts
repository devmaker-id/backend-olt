import { SyslogEvent } from '../core/syslog-event'
import { SyslogEventHandler } from '../contracts/syslog-event-handler'

export class WebEventHandler
implements SyslogEventHandler {

  async handle(
    event: SyslogEvent
  ): Promise<void> {

    console.log(
      '[WEB EVENT]',
      event.type
    )

  }

}