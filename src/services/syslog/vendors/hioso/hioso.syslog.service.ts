import { SyslogEvent }
from '../../core/syslog-event'

import { SyslogService }
from '../../contracts/syslog-service'

import { SyslogEventLogProcessor }
from '../../processors/syslog-event-log.processor'

import { EventHandlerRegistry }
from '../../handlers/event-handler.registry'

export class HisfocusSyslogService
implements SyslogService {

  async process(
    event: SyslogEvent
  ): Promise<void> {

    await SyslogEventLogProcessor.save(
      event
    )

    const handler =
      EventHandlerRegistry.resolve(
        event
      )

    if (!handler) {
      return
    }

    await handler.handle(
      event
    )

  }

}