import { SyslogEvent }
from '../core/syslog-event'

import { OnuEventHandler }
from './onu-event.handler'

import { WebEventHandler }
from './web-event.handler'
import { LoginEventHandler }
from './login-event.handler'

import { OnuDeregisterHandler }
from './onu-deregister.handler'

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

      case 'ONU_ONLINE':
      
      case 'ONU_OFFLINE':
        return new OnuEventHandler()

      case 'SSH_LOGIN':

      case 'SSH_LOGOUT':
        return new LoginEventHandler()

      case 'ONU_UNREGISTER':
        return new OnuDeregisterHandler()

      default:

        return null

    }

  }

}