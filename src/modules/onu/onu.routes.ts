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
import { deleteOltController } from '../olt/olt.controller'

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
  app.delete(
    '/',
    deleteOltController
  )

  // INVENTORY ONU
  app.register(
    onuInventoryRoutes,
    {
      prefix: '/inventory'
    }
  )
}