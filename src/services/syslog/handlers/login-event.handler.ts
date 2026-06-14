import { SyslogEvent }
from '../core/syslog-event'

import { SyslogEventHandler }
from '../contracts/syslog-event-handler'

export class LoginEventHandler
implements SyslogEventHandler {

  async handle(
    event: SyslogEvent
  ): Promise<void> {

    console.log(
      '[LOGIN EVENT]',
      event.payload
    )

  }

}