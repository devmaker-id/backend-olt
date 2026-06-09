import { FastifyInstance } from 'fastify'

import { authMiddleware } from '../../middleware/auth.middleware'

import {
  createTelegramBotController,
  getTelegramBotsController,
  getTelegramBotByIdController,
  updateTelegramBotController,
  deleteTelegramBotController,
  sendTestMessageController,
  getWebhookInfoController,
  setWebhookController,
  deleteWebhookController,

  getTelegramAccessLogsController,
  deleteTelegramAccessLogsController
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


  fastify.get(
    '/:id/webhook-info',
    getWebhookInfoController
  )

  fastify.post(
    '/:id/set-webhook',
    setWebhookController
  )

  fastify.delete(
    '/:id/webhook',
    deleteWebhookController
  )

  //ROUTE TELEGRAM ACCESS LOG
  fastify.get(
    '/access-logs',
    getTelegramAccessLogsController
  )
  fastify.delete(
    '/access-logs/:id',
    deleteTelegramAccessLogsController
  )
}