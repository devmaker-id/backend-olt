import { prisma } from '../../../config/prisma'

export class UnauthorizedOnuProcessor {

  static async upsert(
    params: {
      oltId: string
      macAddress: string
      eponPort: string
      onuId: string
    }
  ) {

    return prisma.unauthorizedOnu.upsert({
      where: {
        macAddress: params.macAddress
      },

      update: {
        eponPort: params.eponPort,
        onuId: params.onuId,
        discoveredAt: new Date()
      },

      create: {
        oltId: params.oltId,
        macAddress: params.macAddress,
        eponPort: params.eponPort,
        onuId: params.onuId
      }
    })

  }

}