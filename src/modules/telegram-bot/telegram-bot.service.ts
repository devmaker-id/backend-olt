import { prisma }
from '../../config/prisma'

import {

  CreateTelegramBotDto,

  UpdateTelegramBotDto

} from './telegram-bot.types'

import {
  validateDuplicateTelegramBot
} from './telegram-bot.validation'

export async function createTelegramBot(
  data: CreateTelegramBotDto
) {

  const botInfo = await verifyTelegramBotToken(data.token)
  await validateDuplicateTelegramBot({
        ...data,
        telegramBotId: String(botInfo.id)
    })

  return prisma.telegramBot.create({
    data: {
        ...data,
        telegramBotId: String(botInfo.id),
        username: botInfo.username
    }
  })

}

export async function getTelegramBots() {

  return prisma.telegramBot.findMany({

    include: {
      users: true
    },

    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getTelegramBotById(
  id: string
) {

  return prisma.telegramBot.findUnique({

    where: {
      id
    },

    include: {
      users: true
    }
  })
}

export async function updateTelegramBot(

  id: string,

  data: UpdateTelegramBotDto
) {

  return prisma.telegramBot.update({

    where: {
      id
    },

    data
  })
}

export async function deleteTelegramBot(
  id: string
) {
  const result = await prisma.telegramBot.count({
    where: { id }
  })

  if(!result){
    return {
        success: false,
        message: 'Telegram Bot, tidak ditemukan'
    }
  }

  return prisma.telegramBot.delete({
    where: { id }
  })
}

export async function
sendTestMessage(
  id: string,
  chatId: string
) {

  const bot =
    await prisma.telegramBot.findUnique({
      where: {
        id
      }
    })

  if (!bot) {
    throw new Error(
      'Telegram bot tidak ditemukan'
    )
  }

  const response =
    await fetch(
      `https://api.telegram.org/bot${bot.token}/sendMessage`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          chat_id: chatId,
          text:
            '✅ Test message from NMS'
        })
      }
    )

  const result =
    await response.json()

  return result
}

export async function
verifyTelegramBotToken(
  token: string
) {

  const response =
    await fetch(
      `https://api.telegram.org/bot${token}/getMe`
    )

  const result =
    await response.json()

  if (!result.ok) {

    throw new Error(
      'Token Telegram tidak valid'
    )
  }

  return result.result
}