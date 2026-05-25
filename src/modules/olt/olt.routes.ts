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
  getOnuInfoController
} from './olt.controller'

export async function oltRoutes(
  app: FastifyInstance
) {
  app.addHook(
    'preHandler',
    authMiddleware
  )

  app.post(
    '/',
    createOltController
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
    '/:id/system',
    getSystemInfoController
  )

  app.get(
    '/:id/onu',
    getOnuInfoController
  )
}