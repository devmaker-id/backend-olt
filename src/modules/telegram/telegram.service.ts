import { prisma } from '../../config/prisma'

import {
  createTelegramSchema,
  updateTelegramSchemaDto,

} from './schemas/telegram.schema'

import { validateDuplicateTelegramUser } from './validation/telegram.validation'

export async function createTelegramUser(
  data: createTelegramSchema
) {
  await validateDuplicateTelegramUser(
    data
  )
  return prisma.telegramUser.create({
    data
  })
}

export async function getTelegramUsers() {
  return prisma.telegramUser.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getTelegramUserById(
  id: string
) {
  return prisma.telegramUser.findUnique({
    where: {
      id
    }
  })
}

export async function updateTelegramUser(
  id: string,
  data: updateTelegramSchemaDto
) {
  return prisma.telegramUser.update({
    where: {
      id
    },
    data
  })
}

export async function deleteTelegramUser(
  id: string
) {
  return prisma.telegramUser.delete({
    where: {
      id
    }
  })
}

export async function validateTelegramUser(
  telegramId: string
) {
  return prisma.telegramUser.findFirst({
    where: {
      telegramId,
      isActive: true
    }
  })
}