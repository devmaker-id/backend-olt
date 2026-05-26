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

  CreateTelegramUserDto,

  UpdateTelegramUserDto,

  TelegramUserParams

} from './telegram.types'

export async function
createTelegramUserController(

  req: FastifyRequest<{
    Body: CreateTelegramUserDto
  }>,

  reply: FastifyReply
) {

  const user =
    await createTelegramUser(
      req.body
    )

  return reply.send(user)
}

export async function
getTelegramUsersController() {

  return getTelegramUsers()
}

export async function
getTelegramUserByIdController(

  req: FastifyRequest<{
    Params: TelegramUserParams
  }>
) {

  return getTelegramUserById(
    req.params.id
  )
}

export async function
updateTelegramUserController(

  req: FastifyRequest<{

    Params: TelegramUserParams

    Body: UpdateTelegramUserDto
  }>
) {

  return updateTelegramUser(

    req.params.id,

    req.body
  )
}

export async function
deleteTelegramUserController(

  req: FastifyRequest<{
    Params: TelegramUserParams
  }>
) {

  return deleteTelegramUser(
    req.params.id
  )
}