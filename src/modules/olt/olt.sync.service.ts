import { prisma }
  from '../../config/prisma'

import { TelnetTransport }
  from '../../services/network/transport/telnet.transport'

import {
  parseOnuList
} from './parsers/onu-list.parser'

import {
  normalizeMac
} from '../../utils/normalize-onu'

export async function
syncOltInventory(
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

  const telnet =
    new TelnetTransport()

  await telnet.connect({

    host:
      olt.ipAddress,

    port:
      olt.telnetPort,

    username:
      olt.username,

    password:
      olt.password
  })

  await telnet.sendCommand(
    'enable'
  )

  const output =
    await telnet.sendCommand(
      `show onu info epon ${port} all`,
      30000,
    )

  const parsed =
    parseOnuList(output)

  let registered = 0
  let unauthorized = 0

  for (const item of parsed) {

    const mac =
      normalizeMac(
        item.macAddress
      )

    const onu =
      await prisma.onu.findUnique({

        where: {
          onuMac: mac
        }
      })

    // ONU TERDAFTAR

    if (onu) {

      registered++

      await prisma.onu.update({

        where: {
          id: onu.id
        },

        data: {

          eponPort:
            item.port,

          onuId:
            item.onuId,

          connectionState:
            item.status === 'Up'
              ? 'ONLINE'
              : 'OFFLINE'
        }
      })

      continue
    }

    // ONU BELUM TERDAFTAR

    unauthorized++

    await prisma.unauthorizedOnu.upsert({

      where: {
        macAddress: mac
      },

      update: {

        eponPort:
          item.port,

        onuId:
          item.onuId,

        onuName:
          item.name,

        status:
          item.status,

        discoveredAt:
          new Date()
      },

      create: {

        oltId:
          olt.id,

        macAddress:
          mac,

        eponPort:
          item.port,

        onuId:
          item.onuId,

        onuName:
          item.name,

        status:
          item.status
      }
    })
  }

  await telnet.disconnect()

  return {

    summary: {

      total:
        parsed.length,

      registered,

      unauthorized
    },

    data: parsed
  }
}