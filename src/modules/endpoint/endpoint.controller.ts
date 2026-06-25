import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { createEndpointSchema } from './schemas/create-endpoint.schema'

import {
  createEndpoint,
  getEndpoints,
  getEndpointByInet,
  getEndpointById,
  updateEndpoint,
  deleteEndpoint,
  getEndpointNotUsed,
  getEndpointUsed
} from './endpoint.service'

import { list, ok, create } from '../../core/http/response'
import { NotFoundError } from '../../core/errors/not-found.error'
import {
  endpointIdParamSchema,
  endpointInternetNoParamSchema
} from './schemas/endpoint-params'
import { updateEndpointSchema } from './schemas/update-endpoint.schema'

export async function createEndpointController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = createEndpointSchema.parse(
    req.body
  )
  const endpoint = await createEndpoint(body)
  return reply.send(
    create(
      endpoint,
      'CREATED_ENDPOINT'
    )
  )
}

export async function getEndpointsController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const endpoints = await getEndpoints()

  if(!endpoints){
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }
  return reply.send(
    list(
      endpoints,
      endpoints.length,
      'ENDPOINTS_FOUND'
    )
  )
}

export async function getEndpointNotUsedController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const endpoints = await getEndpointNotUsed()
  return reply.send(
    list(
      endpoints,
      endpoints.length,
      'ENDPOINTS_FOUND'
    )
  )
}
export async function getEndpointUsedController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const endpoints = await getEndpointUsed()
  return reply.send(
    list(
      endpoints,
      endpoints.length,
      'ENDPOINTS_FOUND'
    )
  )
}

export async function getEndpointByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = endpointIdParamSchema.parse(
    req.params
  )
  const endpoint = await getEndpointById(params.id)

  if(!endpoint){
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }

  return reply.send(
    ok(
      endpoint,
      'ENDPOINT_FOUND'
    )
  )
}

export async function getEndpointByInetController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = endpointInternetNoParamSchema.parse(
    req.params
  )

  const endpoint = await getEndpointByInet(params.internetNo)
  
  if(!endpoint){
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }

  return reply.send(
    ok(
      endpoint,
      'ENDPOINT_FOUND'
    )
  )
}

export async function updateEndpointController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = endpointIdParamSchema.parse(
    req.params
  )
  const body = updateEndpointSchema.parse(
    req.body
  )

  const endpoint = await updateEndpoint(
    params.id,
    body
  )

  return reply.send(
    ok(
      endpoint,
      'ENDPOINT_UPDATED'
    )
  )
}

export async function deleteEndpointController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = endpointIdParamSchema.parse(
    req.params
  )
  const endpoint = await getEndpointById(params.id)
  
  if(!endpoint){
    throw new NotFoundError(
      'ENDPOINT_NOT_FOUND'
    )
  }

  const delEndpoint = await deleteEndpoint(params.id)

  return reply.send(
    ok(
      delEndpoint,
      'ENDPOINT_DELETED'
    )
  )
}