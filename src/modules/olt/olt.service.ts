import { prisma } from '../../config/prisma'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'

import { CreateOltDto } from './olt.types'
import { validateDuplicateOlt } from './olt.validation'

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

export async function getOltOpticalPorts(
  id: string
) {
  const olt =
    await prisma.olt.findUnique({
      where: { id }
    })
  if (!olt) {
    return {
      success: false,
      message: 'OLT tidak ditemukan'
    }
  }
  const transport = new TelnetTransport()
  await transport.connect({
    host: olt.ipAddress,
    port: olt.managementPort
  })
  const session = new TelnetSession( transport )
  await session.login({
    username: olt.username,
    password: olt.password
  })
  const adapter = new HisfocusAdapter( session )
  try {
    const ports = await adapter.getOltOpticalPorts()
    return {
      success: true,
      data: ports
    }
  }
  finally {
    await transport.disconnect()
  }
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

export async function testOnuList(
  oltId: string,
  port: string
) {

  const olt = await prisma.olt.findUnique({
      where: {
        id: oltId
      }
    })

  if (!olt) {
    throw new Error(
      'OLT_NOT_FOUND'
    )
  }
  const transport = new TelnetTransport()
  try {
    await transport.connect({
      host: olt.ipAddress,
      port: olt.managementPort
    })
    const session = new TelnetSession(transport)
    await session.login({
      username: olt.username,
      password: olt.password
    })
    const adapter = new HisfocusAdapter(session)
    const result = await adapter.getOnuList(port)

    const online = result.filter( onu => onu.status === 'Up' ).length
    const offline = result.length - online
    return {
      success: true,
      data: {
        total: result.length,
        online,
        offline
      }
    }
  } catch(error) {
    await transport.disconnect()
    console.log(error)
    return {
      success: false,
      data: null
    }
  } finally {
    await transport.disconnect()
  }
}