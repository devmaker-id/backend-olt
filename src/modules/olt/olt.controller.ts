import {
  FastifyReply,
  FastifyRequest
} from 'fastify'
import { createOltSchema } from './schemas/create-olt.schema'

import {
  createOlt,
  getOlts,
  getOltById,
  updateOlt,
  deleteOlt,
  testOnuList,
  getOltOpticalPorts
} from './olt.service'
import {
  syncOltInventory
} from './olt.sync.service'

import {
  OltParams,
} from './olt.types'

import { prisma } from '../../config/prisma'

import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

import {paramsOltById} from './schemas/params-olt.schema'
import { list, ok } from '../../core/http/response'
import { validateReadyOlt, validationDuplicate } from './validation/olt.validation'
import { updateOltSchema } from './schemas/update-olt.schema'
import { NotFoundError } from '../../core/errors/not-found.error'
import { OltConnectionType, OltPlatform } from '@prisma/client'
import { ForbiddenError } from '../../core/errors/forbidden.error'


export async function createOltController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = createOltSchema.parse(
    req.body
  )

  await validationDuplicate(body.ipAddress)

  const olt = await createOlt(body)

  return reply.send(
    ok(
      olt,
      'OLT_CREATED'
    )
  )
}

export async function getOltsController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const olts = await getOlts()

  return reply.send(
    list(
      olts,
      olts.length,
      'OLT_LIST_FOUND'
    )
  )
}

export async function getOltOpticalPortsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )
  const result = await getOltOpticalPorts(params.id)
  return reply.send(
    ok(
      result,
      'OPTICAL_INFO_PORT'
    )
  )
}

export async function getOltByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )

  const result = await getOltById(params.id)
  if(!reply){
    throw new NotFoundError(
      'OLT_NOT_FOUND'
    )
  }

  return reply.send(
    ok(
      result,
      'OLT_FOUND'
    )
  )

}

export async function updateOltController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )
  const body = updateOltSchema.parse(
    req.body
  )
  await validateReadyOlt(params.id)

  const olt = await updateOlt(params.id, body)
  return reply.send(
    ok(
      olt,
      'OLT_UPDATED'
    )
  )
}

export async function deleteOltController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )
  await validateReadyOlt(params.id)

  const del = await deleteOlt(params.id)
  return reply.send(
    ok(
      del,
      'OLT_DELETED'
    )
  )
}

export async function connectOltController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )

  const olt = await validateReadyOlt(params.id)
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
        const result = await adapter.showSystem()
        return reply.send(
          ok(
            result,
            'OLT_CONNECTED'
          )
        )
      } catch (error: any) {
        await transport.disconnect()
        throw new ForbiddenError(
          'FAILED_CONNET_OLT',
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

export async function getSystemInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )

  const olt = await validateReadyOlt(params.id)
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
    throw new ForbiddenError(
      'IS_DEVELOPMENT_SORRY'
    )
  }
  throw new ForbiddenError(
    'IS_DEVELOPMENT_SORRY'
  )
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
      port: olt.managementPort
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