import { FastifyInstance }
  from 'fastify'

import {
  telegramWebhook
} from './telegram.webhook'

export async function telegramRouter(
  app: FastifyInstance
) {
  app.post(
    '/telegram/:botId',
    telegramWebhook
  )
}