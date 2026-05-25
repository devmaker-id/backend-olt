import { FastifyReply, FastifyRequest } from 'fastify'

export function roleMiddleware(
  roles: string[]
) {
  return async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    const user = req.user as any

    if (!roles.includes(user.role)) {
      return reply.code(403).send({
        message: 'Forbidden'
      })
    }
  }
}