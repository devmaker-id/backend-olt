import { prisma } from '../../config/prisma'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusParser } from '../../services/network/hisfocus/hisfocus.parser'

import {
  normalizeMac,
  generateNameOnu,
} from '../../utils/normalize-onu'
import { validateReadyOlt } from './validation/olt.validation'
import { OltConnectionType, OltPlatform } from '@prisma/client'
import { ForbiddenError } from '../../core/errors/forbidden.error'

export async function syncOltInventory(
  oltId: string,
  portId: string
) {

  const olt = await validateReadyOlt(oltId)
  if(olt.connectionType === OltConnectionType.TELNET){
    if(olt.platform === OltPlatform.HIOSO){
      const transport = new TelnetTransport()
      await transport.connect({
        host: olt.ipAddress,
        port: olt.managementPort,
      })
      const session = new TelnetSession(transport)
      await session.login({
        username: olt.username,
        password: olt.password
      })
      await session.enable()
      const output = await session.execute(`show onu info epon ${portId} all`)

      await transport.disconnect()

      const parsed = HisfocusParser.parseOnuList(output)

      let registeredOnu: any[] = []
      let unauthorizedOnu: any[] = []

      for (const item of parsed) {
        const comntName = generateNameOnu(item.name!)

        const mac =
          normalizeMac(
            item.macAddress
          )

        const onu =
          await prisma.onu.findFirst({

            where: {
              onuMac: mac
            },
            include: {
              endpoint: true
            }
          })

        // ONU TERDAFTAR

        if (onu) {

          await prisma.onu.update({

            where: {
              id: onu.id
            },

            data: {
              portId: item.port,
              onuId: item.onuId,
              connectionState: item.status === 'Up' ? 'ONLINE' : 'OFFLINE',
            }
          })

          registeredOnu.push({
            ...item,
            name: onu.endpoint?.name,
            type: onu.endpoint?.type,
            internetNo: onu.endpoint?.internetNo,
            macAddress: mac,
            endPointId: onu.endpointId,
            dbId: onu.id
          })

          continue
        }

        // ONU BELUM TERDAFTAR singkat padat ternary
        const exiting = await prisma.unauthorizedOnu.findFirst({
          where: {
            macAddress: mac
          }
        }) 
        const unauthorizeData = exiting
        ?
        await prisma.unauthorizedOnu.update({
            where: {
              id: exiting.id
            },
            data: {
              portId: item.port,
              onuId: item.onuId,
              onuComtName: comntName,
              onuName: item.name,
              status: item.status,
              discoveredAt: new Date()
            }
          })
        :
        await prisma.unauthorizedOnu.create({
            data: {
              oltId: olt.id,
              macAddress: mac,
              portId: item.port,
              onuId: item.onuId,
              onuComtName: comntName,
              onuName: item.name,
              status: item.status
            }
        })

        unauthorizedOnu.push({
          ...item,
          macAddress: mac,
          id: unauthorizeData.id,
          onuComtName: comntName
        })
      }

      return {

        summary: {
          total: parsed.length,
          registered: registeredOnu.length,
          unauthorized: unauthorizedOnu.length
        },
        registered: registeredOnu,
        unauthorize: unauthorizedOnu
      }
    }
    throw new ForbiddenError(
      'IS_DEVELOPMENT_SORRY'
    )
  }
  throw new ForbiddenError(
    'IS_DEVELOPMENT_SORRY'
  )
}