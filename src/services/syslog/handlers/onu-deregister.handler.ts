import { SyslogEvent }
from '../core/syslog-event'

import { SyslogEventHandler }
from '../contracts/syslog-event-handler'

export class OnuDeregisterHandler
implements SyslogEventHandler {

  async handle(
    event: SyslogEvent
  ): Promise<void> {

    console.log(
      '[ONU UNREGISTER]',
      event.payload
    )

  }

}