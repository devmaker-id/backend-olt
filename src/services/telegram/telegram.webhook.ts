import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { TelegramService } from './telegram.service'
import { getTelegramBotById } from '../../modules/telegram-bot/telegram-bot.service'

export async function telegramWebhook(
  request: FastifyRequest<{
    Params: {
      botId: string
    },
    Body: any
  }>,
  reply: FastifyReply
) {
  const bot = await getTelegramBotById(request.params.botId)
  if(!bot){ return reply.code(404).send({ success: false }) }

  await TelegramService.processTelegramUpdate(
    bot,
    request.body as any
  )
  return reply.send({
    ok: true
  })
}
