import { HisfocusSyslogService }
  from '../vendors/hioso/hioso.syslog.service'

export class ServiceRegistry {

  static getService() {
    return HisfocusSyslogService
  }

}