import { OltConnectionType, OltPlatform } from '@prisma/client'
import { prisma } from '../../config/prisma'
import { NotFoundError } from '../../core/errors/not-found.error'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'

import { createOltDto } from './schemas/create-olt.schema'
import { ForbiddenError } from '../../core/errors/forbidden.error'
import { updateOltDto } from './schemas/update-olt.schema'
import {
  validateReadyOlt,
  validateReadyDeleteOlt
} from './validation/olt.validation'

export async function createOlt(
  data: createOltDto
) {
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
  const olt = await prisma.olt.findUnique({
      where: { id }
    })
  if (!olt) {
    throw new NotFoundError(
      'OLT_NOT_FOUND'
    )
  }

  if(olt.connectionType === OltConnectionType.TELNET){
    if(olt.platform === OltPlatform.HIOSO){
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
        const ponOlt = await adapter.getOltOpticalPorts()
        return ponOlt
      }
      finally {
        await transport.disconnect()
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

export async function getOltById(id: string) {
  return prisma.olt.findUnique({
    where: {
      id
    }
  })
}

export async function updateOlt(
  id: string,
  data: updateOltDto
) {
  return prisma.olt.update({
    where: {
      id
    },
    data
  })
}

export async function deleteOlt(id: string) {
  await validateReadyDeleteOlt(id)
  return prisma.olt.delete({
    where: {
      id
    }
  })
}

export async function getOnuListByPortOlt(
  oltId: string,
  port: string
) {

  const olt = await validateReadyOlt(oltId)
  if(olt.connectionType === OltConnectionType.TELNET){
    if(olt.platform === OltPlatform.HIOSO){
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

        return result
      } catch(error) {
        await transport.disconnect()
        throw new ForbiddenError(
          'CONNECTION_FILED',
          error
        )
      } finally {
        await transport.disconnect()
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