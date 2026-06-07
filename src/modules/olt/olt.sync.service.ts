import { prisma } from '../../config/prisma'
import { TelnetTransport } from '../../services/network/transport/telnet.transport_v1'
import { parseOnuList } from './parsers/onu-list.parser'
import {
  normalizeMac,
  generateNameOnu,
} from '../../utils/normalize-onu'

export async function syncOltInventory(
  oltId: string,
  port: string
) {

  const olt =
    await prisma.olt.findUnique({

      where: {
        id: oltId
      }
    })

  if (!olt) {

    throw new Error(
      'OLT_NOT_FOUND'
    )
  }

  const telnet = new TelnetTransport()

  await telnet.connect({
    host: olt.ipAddress,
    port: olt.telnetPort,
    username: olt.username,
    password: olt.password
  })

  await telnet.sendCommand(
    'enable'
  )

  const output =
    await telnet.sendCommand(
      `show onu info epon ${port} all`,
      30000,
    )

  const parsed = parseOnuList(output)

  let registeredOnu: any[] = []
  let unauthorizedOnu: any[] = []

  for (const item of parsed) {
    const comntName = generateNameOnu(item.name!)

    const mac =
      normalizeMac(
        item.macAddress
      )

    const onu =
      await prisma.onu.findUnique({

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
          eponPort: item.port,
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

    // ONU BELUM TERDAFTAR
    const unauthorizeData =  await prisma.unauthorizedOnu.upsert({

      where: {
        macAddress: mac
      },

      update: {
        eponPort: item.port,
        onuId: item.onuId,
        onuComtName: comntName,
        onuName: item.name,
        status: item.status,
        discoveredAt: new Date()
      },

      create: {
        oltId: olt.id,
        macAddress: mac,
        eponPort: item.port,
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

  await telnet.disconnect()

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