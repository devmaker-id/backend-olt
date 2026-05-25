import bcrypt from 'bcrypt'

import { prisma } from '../../config/prisma'

export async function login(
  username: string,
  password: string
) {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  const valid = await bcrypt.compare(
    password,
    user.password
  )

  if (!valid) {
    throw new Error('INVALID_PASSWORD')
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  }
}