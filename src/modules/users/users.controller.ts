import type {
  FastifyReply,
  FastifyRequest,
} from 'fastify'

import {
  getCurrentUser,
  updateProfile,
  changePassword,
} from './users.service'

import type {
  UpdateProfileDto,
} from './dto/update-profile.dto'

import type {
  ChangePasswordDto,
} from './dto/change-password.dto'

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

export async function
updateProfileController(
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