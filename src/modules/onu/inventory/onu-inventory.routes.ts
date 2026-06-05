import {
  FastifyInstance
} from 'fastify'

import {
  authMiddleware
} from '../../../middleware/auth.middleware'

import {
  getInventorySummaryController
} from './onu-inventory.controller'

export async function onuInventoryRoutes(
  app: FastifyInstance
) {

  app.get(
    '/summary',
    {
      preHandler: [
        authMiddleware
      ]
    },
    getInventorySummaryController
  )
}