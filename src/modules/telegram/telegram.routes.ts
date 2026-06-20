import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../../middleware/auth.middleware'

import {
  createTelegramUserController,
  getTelegramUsersController,
  getTelegramUserByIdController,
  updateTelegramUserController,
  deleteTelegramUserController
} from './telegram.controller'
import { roleMiddleware } from '../../middleware/role.middleware'
import { Role } from '@prisma/client'

export async function modulesTelegramRoutes(
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
    createTelegramUserController
  )

  app.get(
    '/',
    getTelegramUsersController
  )

  app.get(
    '/:id',
    getTelegramUserByIdController
  )

  app.patch(
    '/:id',
    updateTelegramUserController
  )

  app.delete(
    '/:id',
    deleteTelegramUserController
  )
}