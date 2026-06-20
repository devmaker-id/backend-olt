import { FastifyInstance } from 'fastify'

import { authMiddleware } from '../../middleware/auth.middleware'

import {
  createOltController,
  getOltsController,
  getOltByIdController,
  updateOltController,
  deleteOltController,
  connectOltController,
  getSystemInfoController,
  getOnuInfoController,
  getOnuListController,
  syncOltInventoryController,
  getOltOpticalPortsController
} from './olt.controller'
import { roleMiddleware } from '../../middleware/role.middleware'
import { Role } from '@prisma/client'


export async function oltRoutes(
  app: FastifyInstance
) {
  app.addHook(
    'preHandler',
    authMiddleware
  )
  //semua fiture ini khusus owner
  app.addHook('preHandler', roleMiddleware(
    Role.OWNER
  ))

  app.post(
    '/',
    createOltController
  )
  app.get(
    '/:id/optical',
    getOltOpticalPortsController
  )

  app.get(
    '/',
    getOltsController
  )

  app.get(
    '/:id',
    getOltByIdController
  )

  app.put(
    '/:id',
    updateOltController
  )

  app.delete(
    '/:id',
    deleteOltController
  )

  app.get(
    '/:id/connect',
    connectOltController
  )

  app.get(
    '/:id/onu',
    getOnuInfoController
  )

  app.get(
    '/:id/onus',
    getOnuListController
  )

  app.post(
    '/sync',
    syncOltInventoryController
  )
}