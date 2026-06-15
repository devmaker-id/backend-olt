import { FastifyRequest } from 'fastify'
import { Role } from '@prisma/client'
import { ForbiddenError } from '../core/errors/forbidden.error'

export function roleMiddleware(
  ...roles: Role[]
) {
  return async (
    req: FastifyRequest
  ) => {
    if (!roles.includes(
      req.user.role
    )) {
      throw new ForbiddenError(
        'INSUFFICIENT_PERMISSION'
      )
    }
  }
}