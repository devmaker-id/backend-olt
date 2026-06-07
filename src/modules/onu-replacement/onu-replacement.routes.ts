import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../middleware/auth.middleware'

import {
  replaceOnuController
} from './onu-replacement.controller'

export async function onuReplacementRoutes(
  app: FastifyInstance
) {

  app.addHook(
    'preHandler',
    authMiddleware
  )

  app.post(
    '/',
    replaceOnuController
  )
}