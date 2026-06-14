import { HisfocusSyslogParser } from '../vendors/hioso/hioso.syslog.parser'

export class ParserRegistry {
    
  static getParser() {
    return HisfocusSyslogParser
  }

}