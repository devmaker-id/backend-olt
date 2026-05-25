import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { login } from './auth.service'

export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = req.body as any

    const user = await login(
      body.username,
      body.password
    )

    const token = await reply.jwtSign({
      id: user.id,
      role: user.role
    })

    return reply.send({
      token,
      user
    })
  } catch (error: any) {
    return reply.code(401).send({
      message: error.message
    })
  }
}