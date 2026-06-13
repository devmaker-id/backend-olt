import { VendorResolver } from '../resolvers/vendor.resolver'

export class SyslogDispatcher {

  static async dispatch(
    rawLog: string,
    sourceIp: string
  ) {

    const vendor = VendorResolver.resolve()
    const event = vendor.parser.parse(
        rawLog,
        sourceIp
      )

    if (!event) {
      console.log('INVALID SYSLOG FORMAT')
      return
    }
    await vendor.service.process(event)
  }

}