import { HisfocusSyslogParser } from '../vendors/hisfocus/hisfocus.syslog.parser'

export class ParserRegistry {
    
  static getParser() {
    return HisfocusSyslogParser
  }

}