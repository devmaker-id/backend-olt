import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../middleware/auth.middleware'

import {
  authorizeOnuController,
  getOnusController,
} from './onu.controller'
import {
  onuInventoryRoutes
} from './inventory/onu-inventory.routes'

export async function onuRoutes(
  app: FastifyInstance
) {

  app.addHook(
    'preHandler',
    authMiddleware
  )

  app.get(
    '/',
    getOnusController
  )

  app.post(
    '/',
    authorizeOnuController
  )

  // INVENTORY ONU
  app.register(
    onuInventoryRoutes,
    {
      prefix: '/inventory'
    }
  )
}