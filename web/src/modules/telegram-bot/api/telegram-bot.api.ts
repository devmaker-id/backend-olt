import { api }
from '../../../shared/lib/api'

import type {

  CreateTelegramBotDto,

  UpdateTelegramBotDto

} from '../types/telegram-bot.types'

export async function
getTelegramBots() {

  const response =
    await api.get(
      '/telegram-bots'
    )

  return response.data.data
}

export async function
getTelegramBot(
  id: string
) {

  const response =
    await api.get(
      `/telegram-bots/${id}`
    )

  return response.data.data
}

export async function
createTelegramBot(
  data: CreateTelegramBotDto
) {

  const response =
    await api.post(
      '/telegram-bots',
      data
    )

  return response.data.data
}

export async function
updateTelegramBot(
  id: string,
  data: UpdateTelegramBotDto
) {

  const response =
    await api.patch(
      `/telegram-bots/${id}`,
      data
    )

  return response.data.data
}

export async function
deleteTelegramBot(
  id: string
) {

  const response =
    await api.delete(
      `/telegram-bots/${id}`
    )

  return response.data.data
}

export async function testTelegramBot(
  id: string,
  chatId: string
) {

  const response = await api.post(
      `/telegram-bots/${id}/test`,
      {
        chatId
      }
    )
  return response.data.data
}

export async function
getWebhookInfo(
  id: string
) {

  const response =
    await api.get(
      `/telegram-bots/${id}/webhook-info`
    )

  return response.data.data
}

export async function setWebhook(
  id: string,
  url: string
) {

  const response =
    await api.post(
      `/telegram-bots/${id}/set-webhook`,
      { url }
    )

  return response.data.data
}

export async function
deleteWebhook(
  id: string
) {

  const response =
    await api.delete(
      `/telegram-bots/${id}/webhook`
    )

  return response.data.data
}