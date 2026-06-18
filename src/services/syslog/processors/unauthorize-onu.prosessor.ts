import type { OpticStatus } from '@prisma/client'
import { prisma } from '../../../config/prisma'
import { validateUnauthorizeOnuIdentity } from '../../../modules/onu-unauthorize/validation/onu-unauthorize.validation'

export class UnauthorizedOnuProcessor {
  
  static async upsert(
    params: {
      oltId: string
      onuName: string
      status: OpticStatus
      serialNumber: string
      macAddress: string
      portId: string
      onuId: string
    }
  ) {

    const exiting = await validateUnauthorizeOnuIdentity({
      macAddress: params.macAddress,
      serialNumber: params.serialNumber
    })
    if(exiting) {
      return prisma.unauthorizedOnu.update({
        where: {
          id: exiting.id
        },
        data: {
          onuName: params.onuName,
          status: params.status,
          portId: params.portId,
          onuId: params.onuId,
          discoveredAt: new Date()
        }
      })
    }
    return prisma.unauthorizedOnu.create({
      data: {
        oltId: params.oltId,
        onuName: params.onuName,
        status: params.status,
        serialNumber: params.serialNumber,
        macAddress: params.macAddress,
        portId: params.portId,
        onuId: params.onuId
      }
    })

  }

}