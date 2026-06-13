import { SyslogEvent }
from '../core/syslog-event'

import { OnuEventHandler }
from './onu-event.handler'

import { WebEventHandler }
from './web-event.handler'

export class EventHandlerRegistry {

  static resolve(
    event: SyslogEvent
  ) {

    switch (
      event.type
    ) {

      case 'ONU_LINKUP':

      case 'ONU_LINKDOWN':

        return new OnuEventHandler()

      case 'WEB_LOGIN':

      case 'WEB_CONNECTION':

      case 'WEB_DISCONNECTION':

        return new WebEventHandler()

      default:

        return null

    }

  }

}