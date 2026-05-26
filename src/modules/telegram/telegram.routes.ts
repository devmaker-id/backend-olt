import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../../middleware/auth.middleware'

import {
  createTelegramUserController,
  getTelegramUsersController,
  getTelegramUserByIdController,
  updateTelegramUserController,
  deleteTelegramUserController
} from './telegram.controller'

export async function
modulesTelegramRoutes( fastify: FastifyInstance ) {
    fastify.addHook(
        'preHandler',
        authMiddleware
    )

  fastify.post(
    '/',
    createTelegramUserController
  )

  fastify.get(
    '/',
    getTelegramUsersController
  )

  fastify.get(
    '/:id',
    getTelegramUserByIdController
  )

  fastify.patch(
    '/:id',
    updateTelegramUserController
  )

  fastify.delete(
    '/:id',
    deleteTelegramUserController
  )
}