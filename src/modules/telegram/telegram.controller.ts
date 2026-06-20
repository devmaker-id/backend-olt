import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import {
  createTelegramUser,
  getTelegramUsers,
  getTelegramUserById,
  updateTelegramUser,
  deleteTelegramUser
} from './telegram.service'

import {
  createTelegramSchema,
  telegramUserIdParams,
  updateTelegramSchema
} from './schemas/telegram.schema'

import { ok, list } from '../../core/http/response'
import { validateReadyTelegram } from './validation/telegram.validation'

export async function createTelegramUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const body = createTelegramSchema.parse(
    req.body
  )

  const user = await createTelegramUser(body)

  return reply.send(
    ok(
      user,
      'TELEGRAM_USER_CREATED'
    )
  )
}

export async function getTelegramUsersController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const telegramUsers = await getTelegramUsers()
  return reply.send(
    list(
      telegramUsers,
      telegramUsers.length,
      'TELEGRAM_USERS_LIST'
    )
  )
}

export async function getTelegramUserByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = telegramUserIdParams.parse(
    req.params
  )
  await validateReadyTelegram(params.id)
  
  const telegramUser = await getTelegramUserById(params.id)
  return reply.send(
    ok(
      telegramUser,
      'TELEGRAM_USER_FOUND'
    )
  )
}

export async function updateTelegramUserController(

  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = telegramUserIdParams.parse(
    req.params
  )
  const body = updateTelegramSchema.parse(
    req.body
  )

  await validateReadyTelegram(params.id)

  const telegramUser = await updateTelegramUser(
    params.id,
    body
  )
  return reply.send(
    ok(
      telegramUser,
      'TELEGRAM_USER_UPDATED'
    )
  )
}

export async function deleteTelegramUserController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = telegramUserIdParams.parse(
    req.params
  )
  await validateReadyTelegram(params.id)
  const telegramUser = await deleteTelegramUser(
    params.id
  )

  return reply.send(
    ok(
      telegramUser,
      'TELEGRAM_USER_DELETED'
    )
  )
}