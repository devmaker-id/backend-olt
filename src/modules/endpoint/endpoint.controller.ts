import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  createEndpoint,
  getEndpoints,
  getEndpointByInet,
  getEndpointById,
  updateEndpoint,
  deleteEndpoint
} from './endpoint.service'

import {
  CreateEndpointDto,
  UpdateEndpointDto,
  EndpointParams
} from './endpoint.types'
import { TelegramService } from '../../services/telegram/telegram.service'

export async function createEndpointController(
  req: FastifyRequest,
  reply: FastifyReply
) {

  try {

    const body =
      req.body as CreateEndpointDto

    const endpoint =
      await createEndpoint(body)

    return reply.send({
      success: true,
      data: endpoint
    })

  }

  catch (error: any) {

    return reply.code(400).send({
      success: false,
      message: error.message
    })
  }
}

export async function getEndpointsController() {

  return getEndpoints()
}

export async function getEndpointByInetController(
  request: FastifyRequest<{
    Params: {
      internetNo: string
    }
  }>,
  reply: FastifyReply
) {

  const result = await getEndpointByInet( request.params.internetNo )
  if (
  result.success &&
  result.data
) {

  const data =
    result.data

  await TelegramService.sendMessage(

`<pre>📡 INTERNET DETAIL

ID      : ${data.internetNo}
SITE    : ${data.name}
TYPE    : ${data.type}

OLT     : ${data.olt.name}
ONU     : ${data.onu.name}
STATUS  : ${data.onu.status}
SIGNAL  : ${data.onu.signalStatus}

RX      : ${data.onu.rxPower}
TX      : ${data.onu.txPower}
TEMP    : ${data.onu.temperature}

PORT    : ${data.onu.port}
MODEL   : ${data.onu.model}</pre>`
  )
}
  return reply.send({result})
}

export async function getEndpointByIdController(
  req: FastifyRequest
) {

  const { id } =
    req.params as EndpointParams

  return getEndpointById(id)
}

export async function updateEndpointController(
  req: FastifyRequest
) {

  const { id } =
    req.params as EndpointParams

  const body =
    req.body as UpdateEndpointDto

  return updateEndpoint(id, body)
}

export async function deleteEndpointController(
  req: FastifyRequest
) {

  const { id } =
    req.params as EndpointParams

  return deleteEndpoint(id)
}