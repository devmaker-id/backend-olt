import { prisma }
  from '../../config/prisma'

import {
  CreateTelegramUserDto
} from './telegram.types'

export async function
validateDuplicateTelegramUser(

  data: CreateTelegramUserDto
) {

  const exists =
    await prisma.telegramUser
      .findUnique({

        where: {
          telegramId:
            data.telegramId
        }
      })

  if (exists) {

    throw new Error(
      'TELEGRAM_USER_ALREADY_EXISTS'
    )
  }
}