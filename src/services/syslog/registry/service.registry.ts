import { HisfocusSyslogService }
  from '../vendors/hisfocus/hisfocus.syslog.service'

export class ServiceRegistry {

  static getService() {
    return HisfocusSyslogService
  }

}