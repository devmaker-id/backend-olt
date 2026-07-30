import { prisma } from '../../config/prisma'

import {
  CreateTelegramBotDto,
  UpdateTelegramBotDto,
  TelegramWebhookDto
} from './telegram-bot.types'

import { validateDuplicateTelegramBot } from './telegram-bot.validation'
import { extractTelegramMessage } from './telegram-bot.utils'
import { AppError } from '../../core/errors/app-error'
import { ForbiddenError } from '../../core/errors/forbidden.error'

// SERVICE TELEGRAM ACCESS LOG
export async function createTelegramAccessLog(
  update: TelegramWebhookDto,
  isAuthorized: boolean,
  telegramBotId: string
) {
  const message = update.message
  if(!message?.from) {
    return null
  }
  return prisma.telegramAccessLog.create({
    data: {
      telegramId: String(update.message?.from?.id),
      username: update.message?.from?.username,
      firstName: update.message?.from?.first_name,
      message: extractTelegramMessage(update),
      chatType: update.message?.chat?.type,
      isAuthorized,
      rawUpdate: JSON.parse(
        JSON.stringify(update)
      ),
      telegramBotId
    }
  })
}

export async function getTelegramAccessLogs() {
  return prisma.telegramAccessLog.findMany({
    include: {
      bot: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
export async function deleteTelegramAccessLog(
  id: string
) {
  const result = await prisma.telegramAccessLog.count({
    where: { id }
  })

  if(!result){
    return {
        success: false,
        message: 'Telegram Access, tidak ditemukan'
    }
  }
  const res = await prisma.telegramAccessLog.delete({
    where: { id }
  })
  return {
    success: true,
    message: 'Berhasil dihapus',
    data: res
  }
}

// SERVICE TELEGRAM BOT
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

  const response = await fetch(
      `https://api.telegram.org/bot${token}/getMe`
    )

  const result = await response.json()

  if (!result.ok) {

    throw new AppError(
      404,
      'Token Telegram tidak valid'
    )
  }

  return result.result
}

export async function
getWebhookInfo(
  id: string
) {

  const bot =
    await prisma.telegramBot.findUnique({

      where: {
        id
      }
    })

  if (!bot) {

    throw new Error(
      'Bot tidak ditemukan'
    )
  }

  const response = await fetch(
      `https://api.telegram.org/bot${bot.token}/getWebhookInfo`
    )

  return response.json()
}
export async function setWebhook(
  id: string,
  domain: string
) {

  const bot = await prisma.telegramBot.findUnique({
      where: {id}
    })
  if (!bot) {
    throw new ForbiddenError(
      'Bot tidak ditemukan'
    )
  }
  const response = await fetch(`https://api.telegram.org/bot${bot.token}/setWebhook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: `${domain}/api/webhook/telegram/${bot.id}`
          })
      }
    )

  const result = await response.json()

  if (result.ok) {
    await prisma.telegramBot.update({
      where: {
        id
      },
      data: {
        webhookUrl: `${domain}/api/webhook/telegram/${bot.id}`
      }
    })
  }

  return result
}
export async function deleteWebhook(
  id: string
) {

  const bot =
    await prisma.telegramBot.findUnique({

      where: {
        id
      }
    })

  if (!bot) {

    throw new Error(
      'Bot tidak ditemukan'
    )
  }

  const response =
    await fetch(
      `https://api.telegram.org/bot${bot.token}/deleteWebhook`
    )

  const result =
    await response.json()

  if (result.ok) {

    await prisma.telegramBot.update({

      where: {
        id
      },

      data: {
        webhookUrl: null
      }
    })
  }

  return result
}