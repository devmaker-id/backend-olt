import { FastifyInstance } from 'fastify'

import { authMiddleware } from '../../middleware/auth.middleware'

import {
  createTelegramBotController,
  getTelegramBotsController,
  getTelegramBotByIdController,
  updateTelegramBotController,
  deleteTelegramBotController,
  sendTestMessageController
} from './telegram-bot.controller'

export async function telegramBotRoutes(
  fastify: FastifyInstance
) {

  fastify.addHook(
    'preHandler',
    authMiddleware
  )

  fastify.post(
    '/',
    createTelegramBotController
  )

  fastify.get(
    '/',
    getTelegramBotsController
  )

  fastify.get(
    '/:id',
    getTelegramBotByIdController
  )

  fastify.patch(
    '/:id',
    updateTelegramBotController
  )

  fastify.delete(
    '/:id',
    deleteTelegramBotController
  )

  fastify.post(
    '/:id/test',
    sendTestMessageController
    )
}