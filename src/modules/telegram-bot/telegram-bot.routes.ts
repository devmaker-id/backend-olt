import { FastifyInstance } from 'fastify'
import { Role } from '@prisma/client'

import { authMiddleware } from '../../middleware/auth.middleware'
import { roleMiddleware } from '../../middleware/role.middleware'

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
  app: FastifyInstance
) {

  app.addHook('preHandler', authMiddleware)

  //semua fiture ini khusus owner
  app.addHook('preHandler', roleMiddleware(
    Role.OWNER
  ))

  app.post(
    '/',
    createTelegramBotController
  )
  app.get(
    '/',
    getTelegramBotsController
  )
  app.get(
    '/:id',
    getTelegramBotByIdController
  )
  app.patch(
    '/:id',
    updateTelegramBotController
  )
  app.delete(
    '/:id',
    deleteTelegramBotController
  )
  app.post(
    '/:id/test',
    sendTestMessageController
  )
  app.get(
    '/:id/webhook-info',
    getWebhookInfoController
  )
  app.post(
    '/:id/set-webhook',
    setWebhookController
  )
  app.delete(
    '/:id/webhook',
    deleteWebhookController
  )

  //ROUTE TELEGRAM ACCESS LOG
  app.get(
    '/access-logs',
    getTelegramAccessLogsController
  )
  app.delete(
    '/access-logs/:id',
    deleteTelegramAccessLogsController
  )
}