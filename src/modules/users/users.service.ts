import bcrypt
  from 'bcrypt'

import { prisma } from "../../config/prisma"

import type {
  UpdateProfileDto,
} from './dto/update-profile.dto'

import type {
  ChangePasswordDto,
} from './dto/change-password.dto'

import {
  validateExistingUser,
  validatePassword,
  validateUniqueUsername,
  validateUsername,
} from './validation/users.validation'

export async function getCurrentUser(
  id: string,
) {

  const user =
    await validateExistingUser(
      id,
    )

  return {
    id: user.id,
    username:
      user.username,
    role:
      user.role,
    createdAt:
      user.createdAt,
    updatedAt:
      user.updatedAt,
  }
}

export async function
updateProfile(
  id: string,
  data: UpdateProfileDto,
) {

  const user =
    await validateExistingUser(
      id,
    )

  if (
    data.username &&
    data.username !==
      user.username
  ) {

    validateUsername(
      data.username,
    )

    await validateUniqueUsername(
      data.username,
      user.id,
    )

  }

  const updatedUser =
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        username:
          data.username,
      },
    })

  return {
    id:
      updatedUser.id,

    username:
      updatedUser.username,

    role:
      updatedUser.role,

    createdAt:
      updatedUser.createdAt,

    updatedAt:
      updatedUser.updatedAt,
  }
}

export async function
changePassword(
  id: string,
  data: ChangePasswordDto,
) {

  const user =
    await validateExistingUser(
      id,
    )

  const isValidPassword =
    await bcrypt.compare(
      data.oldPassword,
      user.password,
    )

  if (
    !isValidPassword
  ) {

    throw new Error(
      'INVALID_OLD_PASSWORD',
    )

  }

  validatePassword(
    data.newPassword,
  )

  const hashedPassword =
    await bcrypt.hash(
      data.newPassword,
      10,
    )

  await prisma.user.update({
    where: {
      id: user.id,
    },

    data: {
      password:
        hashedPassword,
    },
  })

  return {
    success: true,
    message:
      'PASSWORD_UPDATED',
  }
}