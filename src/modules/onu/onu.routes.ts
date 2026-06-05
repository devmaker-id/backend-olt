import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../middleware/auth.middleware'

import {
  authorizeOnuController,
  getUnauthorizedOnusController
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
    '/unregistered',
    getUnauthorizedOnusController
  )

  app.post(
    '/authorize',
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