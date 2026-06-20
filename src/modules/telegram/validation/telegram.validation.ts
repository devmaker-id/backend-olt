import { prisma } from '../../../config/prisma'
import { NotFoundError } from '../../../core/errors/not-found.error'
import { ValidationError } from '../../../core/errors/validation.error'

import { createTelegramSchema } from '../schemas/telegram.schema'

export async function validateTelegramUser(
  telegramId: string
) {
  //digunakan di service/telegram/telegram.service
  const telegramUser = await prisma.telegramUser.findUnique({
    where: {
      telegramId
    }
  })
  return telegramUser
}

export async function validateReadyTelegram(
  id: string
) {
  const telegramUser = await prisma.telegramUser.findUnique({
    where:{id}
  })
  if(!telegramUser){
    throw new NotFoundError(
      'TELEGRAM_USER_NOT_FOUND'
    )
  }
  return telegramUser
}

export async function validateDuplicateTelegramUser(
  data: createTelegramSchema
) {

  const exists = await prisma.telegramUser.findUnique({
        where: {
          telegramId: data.telegramId
        }
      })

  if (exists) {
    throw new ValidationError(
      'TELEGRAM_USER_ALREADY_EXISTS'
    )
  }
}