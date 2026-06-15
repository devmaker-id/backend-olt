import bcrypt from 'bcrypt'

import { prisma } from '../../config/prisma'
import { LoginDto } from './schemas/login.schema'

import { NotFoundError } from '../../core/errors/not-found.error'
import { UnauthorizedError } from '../../core/errors/unauthorized.error'

export async function login(
  payload: LoginDto
) {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username
    }
  })

  if (!user) {
    throw new NotFoundError(
      'USER_NOT_FOUND'
    )
  }

  const valid = await bcrypt.compare(
    payload.password,
    user.password
  )

  if (!valid) {
    throw new UnauthorizedError(
      'INVALID_PASSWORD'
    )
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  }
}