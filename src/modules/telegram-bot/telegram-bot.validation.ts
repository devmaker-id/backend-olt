import { prisma }
from '../../config/prisma'

import {
  CreateTelegramBotDto
} from './telegram-bot.types'

export async function validateDuplicateTelegramBot(
  data: CreateTelegramBotDto
) {

  console.log('payload: ', data)
  
  const existing = await prisma.telegramBot.findFirst({
    where: {
      telegramBotId: String(data.telegramBotId)
    }
  })

  console.log('db: ', existing)

if (existing) {

  throw new Error(
    'Bot Telegram sudah terdaftar'
  )
}
}