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
  getOnuListByPortOlt,
  getOltOpticalPorts
} from './olt.service'
import {
  syncOltInventory
} from './olt.sync.service'

import { TelnetTransport } from '../../services/network/hisfocus/telnet.transport'
import { TelnetSession } from '../../services/network/hisfocus/telnet.session'
import { HisfocusAdapter } from '../../services/network/hisfocus/hisfocus.adapter'

import {paramsOltById} from './schemas/params-olt.schema'
import { list, ok } from '../../core/http/response'
import { validateOnuDetail, validateReadyOlt, validationDuplicate } from './validation/olt.validation'
import { updateOltSchema } from './schemas/update-olt.schema'
import { NotFoundError } from '../../core/errors/not-found.error'
import { OltConnectionType, OltPlatform } from '@prisma/client'
import { ForbiddenError } from '../../core/errors/forbidden.error'
import { onuQuerySchema, queryOnuLists } from './schemas/query-olt.schema'
import { bodyOltAsyncSchema } from './schemas/body-olt.schema'
import { AppError } from '../../core/errors/app-error'


export async function syncOltInventoryController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = bodyOltAsyncSchema.parse(
    req.body
  )
  try {
    const result = await syncOltInventory(
        body.oltId,
        body.portId
      )
    return reply.send(
      ok(
        result,
        'SYNC_OLT_TO_DB'
      )
    )
  } catch (error: any) {
    throw new ForbiddenError(
      'CONNECTION_FAILED',
      error
    )
  }
}

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
    throw new AppError(
      400,
      'IS_DEVELOPMENT_SORRY'
    )
  }
  throw new AppError(
    400,
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
        throw new ForbiddenError(
          'FAILED_GET_SYSTEM_INFO',
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

export async function getOnuInfoController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  const params = paramsOltById.parse(
    req.params
  )
  const query = onuQuerySchema.parse(
    req.query
  )
  const data = await validateOnuDetail(
    params.id,
    query.portid,
    query.onuid
  )
  if(data.olt.connectionType === OltConnectionType.TELNET){
    if(data.olt.platform === OltPlatform.HIOSO){
      const transport = new TelnetTransport()
      try {
        await transport.connect({
          host: data.olt.ipAddress,
          port: data.olt.managementPort
        })
        const session = new TelnetSession(transport)
        await session.login({
          username: data.olt.username,
          password: data.olt.password
        })
        const adapter = new HisfocusAdapter(session)
        const result = await adapter.getCompleteOnuInfo(
              query.portid,
              query.onuid
            )
        return reply.send({
          success: true,
          data: result
        })

      } catch (error: any) {
        await transport.disconnect()
        throw new ForbiddenError(
          'FAILED_GET_ONU_INFO',
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

export async function getOnuListController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = paramsOltById.parse(
    req.params
  )
  const query = queryOnuLists.parse(
    req.query
  )
  try {
    const result = await getOnuListByPortOlt(
        params.id,
        query.portid
      )
    return reply.send(
      list(
        result,
        result.length,
        'ONUS_LISTED'
      )
    )
  } catch (error: any) {
    return reply.status(500).send({
      success: false,
      message: error.message
    })
  }
}
