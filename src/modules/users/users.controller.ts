import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify'

import {
  createUser,
  updateUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  resetUserPassword,
  getUserById,
  getUsers,
  deleteUser,
} from './users.service'

import { createUserSchema } from './schemas/create-user.schema'
import { create, list, ok } from '../../core/http/response'
import { updateUserSchema } from './schemas/update-user.schema'
import { userIdParamSchema } from './schemas/update-id-param.schema'
import { updateProfileSchema } from './schemas/update-profile.schema'
import { changePasswordSchema } from './schemas/change-password.schema'
import { resetPasswordSchema } from './schemas/reset-password.schema'

export async function createUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = createUserSchema.parse(
    req.body
  )
  const user = await createUser(body)
  return reply.send(
    create(
      user,
      'USER_CREATED'
    )
  )
}

export async function updateUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const params = userIdParamSchema.parse(
    req.params
  )
  const body = updateUserSchema.parse(
    req.body
  )
  const user = await updateUser(
    params.id,
    body
  )

  return reply.send(
    ok(
      user,
      'USER_UPDATED'
    )
  )
}
export async function getUsersController(
  _: FastifyRequest,
  reply: FastifyReply
) {

  const users = await getUsers()
  return reply.send(
    list(
      users,
      users.length,
      'USERS_FOUND'
    )
  )

}
export async function getUserByIdController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const params = userIdParamSchema.parse(
    req.params
  )
  const user = await getUserById(
    params.id
  )
  return reply.send(
    ok(
      user,
      'USER_FOUND'
    )
  )
}

export async function getCurrentUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await getCurrentUser(
    req.user.id
  )
  return reply.send(
    ok(
      user,
      'CURRENT_USER_FOUND'
    )
  )
}

export async function updateProfileController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = updateProfileSchema.parse(
    req.body
  )
  const user = await updateProfile(
    req.user.id,
    body
  )
  return reply.send(
    ok(
      user,
      'USER_UPDATED'
    )
  )
}

export async function changePasswordController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = changePasswordSchema.parse(
    req.body
  )
  await changePassword(
    req.user.id,
    body
  )

  return reply.send(
    ok(
      null,
      'PASSWORD_CHANGED'
    )
  )

}
export async function resetPasswordController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const params = userIdParamSchema.parse(
    req.params
  )
  const body = resetPasswordSchema.parse(
    req.body
  )
  await resetUserPassword(
    params.id,
    body.password
  )
  return reply.send(
    ok(
      null,
      'PASSWORD_RESET'
    )
  )
}
export async function deleteUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const params = userIdParamSchema.parse(
    req.params
  )
  await deleteUser(
    params.id
  )
  return reply.send(
    ok(
      null,
      'USER_DELETED'
    )
  )
}