import { FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../core/errors/unauthorized.error'

export async function authMiddleware(
  req: FastifyRequest
) {
  try {
    await req.jwtVerify()
  } catch {
    throw new UnauthorizedError(
      'UNAUTHORIZED'
    )
  }
}