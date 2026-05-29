import { prisma }
  from '../../config/prisma'

export async function
validateTelegramUser(
  telegramId: string
) {

  const user =
    await prisma.telegramUser
      .findUnique({

        where: {
          telegramId
        }
      })

  if (
    !user || !user.isActive
  ) {
    return null
  }

  return user
}