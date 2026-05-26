import { prisma } from '../../config/prisma'
import { TelnetTransport } from '../../services/network/transport/telnet.transport'
import { CreateOltDto } from './olt.types'

import { validateDuplicateOlt } from './olt.validation'
import {
  parseOnuList
} from './parsers/onu-list.parser'

export async function createOlt(data: CreateOltDto) {
  await validateDuplicateOlt(data)
  return prisma.olt.create({data})
}

export async function getOlts() {
  return prisma.olt.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getOltById(id: string) {
  return prisma.olt.findUnique({
    where: {
      id
    }
  })
}

export async function updateOlt(
  id: string,
  data: any
) {
  return prisma.olt.update({
    where: {
      id
    },
    data
  })
}

export async function deleteOlt(id: string) {
  return prisma.olt.delete({
    where: {
      id
    }
  })
}

export async function
testOnuList(

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
    'enable',
    5000
  )

  const output =
    await telnet.sendCommand(

`show onu info epon ${port} all`,

      30000
    )

  console.log(output)

  const parsed =
    parseOnuList(output)

  await telnet.disconnect()

  const online =
    parsed.filter(

      onu =>
        onu.status === 'Up'
    ).length

  const offline =
    parsed.length - online

  return {

    summary: {

      total:
        parsed.length,

      online,

      offline
    },

    data:
      parsed
  }
}