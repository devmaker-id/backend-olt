import { prisma } from '../../../config/prisma'
import { OltNameResolver } from '../resolvers/olt-name.resolver'
import { VendorResolver } from '../resolvers/vendor.resolver'

export class SyslogDispatcher {

  static async dispatch(
    rawLog: string,
    sourceIp: string
  ) {

    const oltName = OltNameResolver.resolve(
      rawLog
    )
    
    if(!oltName) {
      return
    }
    const olt = await prisma.olt.findFirst({
        where: {
          syslogName: oltName
        }
      })

    if (!olt) {
      return
    }

    const vendor = VendorResolver.resolve(olt.vendor)
    const event = vendor.parser.parse(
        rawLog,
        sourceIp
      )

    if (!event) {
      return
    }
    await vendor.service.process(event)
  }

}