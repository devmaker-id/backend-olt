import {

  FastifyReply,

  FastifyRequest

} from 'fastify'

import {

  createTelegramBot,

  getTelegramBots,

  getTelegramBotById,

  updateTelegramBot,

  deleteTelegramBot,
  sendTestMessage,
  getWebhookInfo,
  setWebhook,
  deleteWebhook

} from './telegram-bot.service'

import {

  CreateTelegramBotDto,

  UpdateTelegramBotDto

} from './telegram-bot.types'

export async function createTelegramBotController(

  request: FastifyRequest<{
    Body: CreateTelegramBotDto
  }>,

  reply: FastifyReply
) {

  const bot =
    await createTelegramBot(
      request.body
    )

  return reply.send({
    data: bot
  })
}

export async function getTelegramBotsController() {

  const bots =
    await getTelegramBots()

  return {
    data: bots
  }
}

export async function
getTelegramBotByIdController(

  request: FastifyRequest<{
    Params: {
      id: string
    }
  }>
) {

  const bot =
    await getTelegramBotById(
      request.params.id
    )

  return {
    data: bot
  }
}

export async function
updateTelegramBotController(

  request: FastifyRequest<{

    Params: {
      id: string
    }

    Body: UpdateTelegramBotDto

  }>
) {

  const bot =
    await updateTelegramBot(

      request.params.id,

      request.body
    )

  return {
    data: bot
  }
}

export async function
deleteTelegramBotController(

  request: FastifyRequest<{
    Params: {
      id: string
    }
  }>
) {

  const bot =
    await deleteTelegramBot(
      request.params.id
    )

  return {
    data: bot
  }
}

export async function
sendTestMessageController(

  request: FastifyRequest<{

    Params: {
      id: string
    }

    Body: {
      chatId: string
    }

  }>
) {

  const result =
    await sendTestMessage(

      request.params.id,

      request.body.chatId
    )

  return {
    data: result
  }
}

export async function
getWebhookInfoController(

  request: FastifyRequest<{
    Params: {
      id: string
    }
  }>
) {

  const result =
    await getWebhookInfo(
      request.params.id
    )

  return {
    data: result
  }
}
export async function
setWebhookController(

  request: FastifyRequest<{

    Params: {
      id: string
    }

    Body: {
      url: string
    }

  }>
) {

  const result =
    await setWebhook(

      request.params.id,

      request.body.url
    )

  return {
    data: result
  }
}
export async function
deleteWebhookController(

  request: FastifyRequest<{
    Params: {
      id: string
    }
  }>
) {

  const result =
    await deleteWebhook(
      request.params.id
    )

  return {
    data: result
  }
}