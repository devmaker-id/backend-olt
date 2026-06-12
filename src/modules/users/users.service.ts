import bcrypt from 'bcrypt'

import { prisma } from "../../config/prisma"

import type {
  UpdateProfileDto,
} from './dto/update-profile.dto'
import type { CreateUserDto } from './dto/create-user.dto'

import type {
  ChangePasswordDto,
} from './dto/change-password.dto'
import type { UpdateUserDto } from './dto/update-user.dto'

import {
  validateExistingUser,
  validatePassword,
  validateUniqueUsername,
  validateUsername,
} from './validation/users.validation'

export async function
createUser(
  data: CreateUserDto,
) {

  const existingUser =
    await prisma.user.findUnique({

      where: {
        username:
          data.username,
      },

    })

  if (existingUser) {

    throw new Error(
      'USERNAME_ALREADY_EXISTS',
    )

  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10,
    )

  const user =
    await prisma.user.create({

      data: {

        username:
          data.username,

        password:
          hashedPassword,

        role:
          data.role,

      },

      select: {

        id: true,

        username: true,

        role: true,

        createdAt: true,

      },

    })

  return {

    success: true,

    message:
      'USER_CREATED',

    data: user,

  }

}
export async function
updateUser(
  id: string,
  data: UpdateUserDto,
) {

  const user =
    await prisma.user.findUnique({

      where: {
        id,
      },

    })

  if (!user) {

    throw new Error(
      'USER_NOT_FOUND',
    )

  }

  if (
    data.username &&
    data.username !==
      user.username
  ) {

    const existingUser =
      await prisma.user.findUnique({

        where: {
          username:
            data.username,
        },

      })

    if (existingUser) {

      throw new Error(
        'USERNAME_ALREADY_EXISTS',
      )

    }

  }

  const updatedUser =
    await prisma.user.update({

      where: {
        id,
      },

      data: {

        username:
          data.username,

        role:
          data.role,

      },

      select: {

        id: true,

        username: true,

        role: true,

        createdAt: true,

        updatedAt: true,

      },

    })

  return {

    success: true,

    message:
      'USER_UPDATED',

    data:
      updatedUser,

  }

}
export async function getUsers() {

  return prisma.user.findMany({

    orderBy: {
      createdAt: 'desc',
    },

    select: {

      id: true,

      username: true,

      role: true,

      createdAt: true,

      updatedAt: true,

    },

  })

}

export async function
getUserById(
  id: string,
) {

  return prisma.user.findUnique({

    where: {
      id,
    },

    select: {

      id: true,

      username: true,

      role: true,

      createdAt: true,

      updatedAt: true,

    },

  })

}

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

export async function updateProfile(
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

export async function changePassword(
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