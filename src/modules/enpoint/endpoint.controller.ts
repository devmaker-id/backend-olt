import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  createEndpoint,
  getEndpoints,
  getEndpointById,
  updateEndpoint,
  deleteEndpoint
} from './endpoint.service'

import {
  CreateEndpointDto,
  UpdateEndpointDto,
  EndpointParams
} from './endpoint.types'

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