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
  getUserById,
  getUsers,
} from './users.service'

import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'

import type {
  UpdateProfileDto,
} from './dto/update-profile.dto'

import type {
  ChangePasswordDto,
} from './dto/change-password.dto'

export async function createUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {

    const body =
      req.body as CreateUserDto

    const result =
      await createUser(
        body,
      )

    return reply.send(
      result,
    )

  }

  catch (
    error: any
  ) {

    return reply
      .code(400)
      .send({

        success: false,

        message:
          error.message,

      })

  }

}
export async function
updateUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {

    const {
      id,
    } = req.params as {
      id: string
    }

    const body =
      req.body as UpdateUserDto

    const result =
      await updateUser(
        id,
        body,
      )

    return reply.send(
      result,
    )

  }

  catch (
    error: any
  ) {

    return reply
      .code(400)
      .send({

        success: false,

        message:
          error.message,

      })

  }

}
export async function getUsersController() {

  return getUsers()

}
export async function getUserByIdController(
  req: FastifyRequest
) {

  const {
    id,
  } = req.params as {
    id: string
  }

  return getUserById(
    id,
  )

}

export async function getCurrentUserController(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {

    const result =
      await getCurrentUser(
        req.user.id,
      )

    return reply.send(
      result,
    )

  }

  catch ( error: any ) {
    return reply.status(400).send({
        success: false,
        message: error.message,
      })

  }

}

export async function updateProfileController(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {

    const body =
      req.body as
      UpdateProfileDto

    const result =
      await updateProfile(
        req.user.id,
        body,
      )

    return reply.send({
      success: true,
      data: result,
    })

  }

  catch (error: any) {
    return reply.status(400).send({
        success: false,
        message: error.message,
      })

  }

}

export async function changePasswordController(
  req: FastifyRequest,
  reply: FastifyReply,
) {

  try {

    const body =
      req.body as
      ChangePasswordDto

    const result =
      await changePassword(
        req.user.id,
        body,
      )

    return reply.send(
      result,
    )

  }

  catch ( error: any ) {

    return reply
      .status(400)
      .send({

        success: false,

        message:
          error.message,

      })

  }

}