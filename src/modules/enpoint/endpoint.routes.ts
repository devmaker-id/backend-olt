import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../middleware/auth.middleware'

import {
  createEndpointController,
  getEndpointsController,
  getEndpointByIdController,
  updateEndpointController,
  deleteEndpointController
} from './endpoint.controller'

export async function endpointRoutes(
  app: FastifyInstance
) {

  app.addHook(
    'preHandler',
    authMiddleware
  )

  app.post(
    '/',
    createEndpointController
  )

  app.get(
    '/',
    getEndpointsController
  )

  app.get(
    '/:id',
    getEndpointByIdController
  )

  app.put(
    '/:id',
    updateEndpointController
  )

  app.delete(
    '/:id',
    deleteEndpointController
  )
}