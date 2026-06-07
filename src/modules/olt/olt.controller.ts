import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  createOlt,
  getOlts,
  getOltById,
  updateOlt,
  deleteOlt,
  testOnuList
} from './olt.service'
import {
  syncOltInventory
} from './olt.sync.service'

import {
  CreateOltDto,
  OltParams,
} from './olt.types'

import { prisma } from '../../config/prisma'

import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

export async function createOltController(
  req: FastifyRequest<{
    Body: CreateOltDto
  }>,
  reply: FastifyReply
) {
  const body = req.body

  const olt = await createOlt(body)

  return reply.send(olt)
}

export async function getOltsController() {
  return getOlts()
}

export async function getOltByIdController(
  req: FastifyRequest
) {
  const { id } = req.params as any

  return getOltById(id)
}

export async function updateOltController(
  req: FastifyRequest
) {
  const { id } = req.params as any

  const body = req.body

  return updateOlt(id, body)
}

export async function deleteOltController(
  req: FastifyRequest
) {
  const { id } = req.params as any

  return deleteOlt(id)
}

export async function connectOltController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } =
    req.params as OltParams

  const olt = await prisma.olt.findUnique({
      where: { id }
    })

  if (!olt) {
    return reply.code(404).send({
      success: false,
      message: 'OLT_NOT_FOUND'
    })
  }

  const transport = new TelnetTransport()
  try {
    await transport.connect({
      host: olt.ipAddress,
      port: olt.telnetPort
    })
    const session = new TelnetSession(transport)
    await session.login({
      username: olt.username,
      password: olt.password
    })
    const adapter = new HisfocusAdapter(session)
    const result = await adapter.showSystem()

    console.log(result)

    return reply.send({
      success: true,
      data: result
    })
  } catch (error: any) {
    await transport.disconnect()
    return reply.code(500).send({
      success: false,
      message: 'FAILED_CONNECT_OLT',
      error: error.message,
      host: olt.ipAddress,
      port: olt.telnetPort
    })
  } finally {
    await transport.disconnect()
  }
}

export async function getSystemInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } =
    req.params as OltParams

  const olt =
    await prisma.olt.findUnique({
      where: {
        id
      }
    })

  if (!olt) {
    return reply.code(404).send({
      success: false,
      message: 'OLT_NOT_FOUND'
    })
  }

  const transport = new TelnetTransport()
  try {
    await transport.connect({
      host: olt.ipAddress,
      port: olt.telnetPort
    })
    const session = new TelnetSession(transport)
    await session.login({
      username: olt.username,
      password: olt.password
    })
    const adapter = new HisfocusAdapter(session)
    const result =await adapter.showSystem()

    return reply.send({
      success: true,
      data: result
    })
  } catch (error: any) {
    await transport.disconnect()
    return reply.code(500).send({
      success: false,
      message: 'FAILED_GET_SYSTEM_INFO',
      error: error.message
    })
  } finally {
    await transport.disconnect()
  }
}

export async function getOnuInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const { id } =
    req.params as {
      id: string
    }

  const {
    epon,
    onuId
  } = req.query as {
    epon: string
    onuId: string
  }

  const olt =
    await prisma.olt.findUnique({
      where: {
        id
      }
    })

  if (!olt) {
    return reply.code(404).send({
      success: false,
      message: 'OLT_NOT_FOUND'
    })
  }

  const transport = new TelnetTransport()
  try {
    await transport.connect({
      host: olt.ipAddress,
      port: olt.telnetPort
    })
    const session = new TelnetSession(transport)
    await session.login({
      username: olt.username,
      password: olt.password
    })
    const adapter = new HisfocusAdapter(session)
    const result = await adapter.getCompleteOnuInfo(
          epon,
          onuId
        )

    return reply.send({
      success: true,
      data: result
    })

  } catch (error: any) {
    await transport.disconnect()
    return reply.code(500).send({
      success: false,
      message: 'FAILED_GET_ONU_INFO',
      error: error.message
    })
  } finally {
    await transport.disconnect()
  }
}

export async function getOnuListController(
  request: FastifyRequest<{
    Params: { id: string }
    Querystring: { port: string }
  }>,
  reply: FastifyReply
) {
  try {
    const result = await testOnuList(
        request.params.id,
        request.query.port
      )
    return reply.send(result)
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message
    })
  }
}

export async function syncOltInventoryController(
  request: FastifyRequest<{
    Body: {
      oltId: string
      port: string
    }
  }>,
  reply: FastifyReply
) {
  try {
    const result = await syncOltInventory(
        request.body.oltId,
        request.body.port
      )
    return reply.send({
      success: true,
      ...result
    })
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message
    })
  }
}