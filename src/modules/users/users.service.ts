import bcrypt from 'bcrypt'

import { prisma } from "../../config/prisma"
import { Role } from '@prisma/client'

import { UpdateProfileDto } from './schemas/update-profile.schema'
import type { CreateUserDto } from './schemas/create-user.schema'
import type { ChangePasswordDto } from './schemas/change-password.schema'
import type { UpdateUserDto } from './schemas/update-user.schema'

import {
  validateExistingUser,
  validatePassword,
  validateUniqueUsername,
  validateUsername,
} from './validation/users.validation'

import { ValidationError } from '../../core/errors/validation.error'
import { NotFoundError } from '../../core/errors/not-found.error'
import { USER_SELECT } from './users.constants'

export async function createUser(
  data: CreateUserDto,
) {
  validateUsername(data.username)

  const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    )

  return prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role,
        email: data.email,
        telepon: data.telepon,
        alamat: data.alamat,
        telegramId: data.telegramId
      },
      select: USER_SELECT,
    })

}
export async function updateUser(
  id: string,
  data: UpdateUserDto,
) {
  const user = await validateExistingUser(id)

  if (data.username && data.username !== user.username) {
    await validateUniqueUsername(data.username)
  }

  return prisma.user.update({
      where: {id},
      data: {
        username: data.username,
        role: data.role,
        email: data.email,
        telepon: data.telepon,
        alamat: data.alamat,
        telegramId: data.telegramId,
      },
      select: USER_SELECT,
    })

}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: USER_SELECT,
  })
}

export async function getUserById(
  id: string,
) {

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: USER_SELECT,
  })
  if(!user){
    throw new NotFoundError(
      'USER_NOT_FOUND'
    )
  }
  return user
}

export async function deleteUser(
  id: string,
) {

  const user = await validateExistingUser(id)

  if (user.role === Role.OWNER) {

    const ownerCount = await prisma.user.count({
        where: {
          role: Role.OWNER,
        },
      })
    if (
      ownerCount <= 1
    ) {
      throw new ValidationError(
        'LAST_OWNER_CANNOT_BE_DELETED',
      )
    }

  }

  await prisma.user.delete({

    where: {
      id,
    },

  })

  return null

}

export async function getCurrentUser(
  id: string,
) {
  const user = await prisma.user.findUnique({
    where: {id},
    select: USER_SELECT
  })
  if(!user) {
    throw new NotFoundError(
      'USER_NOT_FOUND'
    )
  }
  return user
}

export async function updateProfile(
  id: string,
  data: UpdateProfileDto,
) {

  const user = await validateExistingUser(id)

  if (data.username && data.username !== user.username) {

    validateUsername(data.username)

    await validateUniqueUsername(
      data.username,
      user.id,
    )

  }

  return prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        username: data.username,
        telepon: data.telepon,
        email: data.email,
        alamat: data.alamat,
        telegramId: data.telegramId
      },
      select: USER_SELECT
    })
}

export async function changePassword(
  id: string,
  data: ChangePasswordDto,
) {

  const user = await validateExistingUser(id)

  const isValidPassword = await bcrypt.compare(
      data.oldPassword,
      user.password,
    )

  if (!isValidPassword) {
    throw new ValidationError(
      'INVALID_OLD_PASSWORD',
    )
  }

  validatePassword(data.newPassword)

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
      password: hashedPassword,
    }
  })

  return null
}
export async function resetUserPassword(
  id: string,
  password: string,
) {

  await validateExistingUser(id)

  const hashedPassword = await bcrypt.hash(
      password,
      10,
    )

  await prisma.user.update({
    where: {id},
    data: {
      password: hashedPassword,
    }
  })
  return null
}