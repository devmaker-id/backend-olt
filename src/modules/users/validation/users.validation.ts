import { prisma } from "../../../config/prisma"
import { NotFoundError } from "../../../core/errors/not-found.error"
import { ValidationError } from "../../../core/errors/validation.error"

export async function validateExistingUser(
  id: string,
) {

  const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

  if (!user) {
    throw new NotFoundError(
      'USER_NOT_FOUND',
    )
  }

  return user
}

export async function validateUniqueUsername(
  username: string,
  excludeId?: string,
) {

  const user =
    await prisma.user.findFirst({
      where: {
        username,

        NOT: excludeId
          ? {
              id: excludeId,
            }
          : undefined,
      },
    })

  if (user) {

    throw new ValidationError(
      'USERNAME_ALREADY_EXISTS',
    )

  }
}

export function validateUsername(
  username: string,
) {

  const value = username.trim()

  if (!value) {

    throw new ValidationError(
      'USERNAME_REQUIRED',
    )

  }

  if (value.length < 3) {

    throw new ValidationError(
      'USERNAME_MIN_3_CHARACTERS',
    )

  }

  if (value.length > 50) {

    throw new ValidationError(
      'USERNAME_MAX_50_CHARACTERS',
    )

  }
}

export function validatePassword(
  password: string,
) {

  if (!password) {

    throw new ValidationError(
      'PASSWORD_REQUIRED',
    )

  }

  if (password.length < 6) {

    throw new ValidationError(
      'PASSWORD_MIN_6_CHARACTERS',
    )

  }
}