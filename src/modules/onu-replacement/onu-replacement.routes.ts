import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../middleware/auth.middleware'

import {
  getOnuReplacementsController,
  getOnuReplacementByIdController,
  replaceOnuController
} from './onu-replacement.controller'

export async function onuReplacementRoutes(
  app: FastifyInstance
) {

  app.addHook(
    'preHandler',
    authMiddleware
  )

  app.get(
    '/',
    getOnuReplacementsController
  )
  app.get(
    '/:id',
    getOnuReplacementByIdController
  )

  app.post(
    '/',
    replaceOnuController
  )
}