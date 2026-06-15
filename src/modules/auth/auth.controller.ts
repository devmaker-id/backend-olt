import {
  FastifyReply,
  FastifyRequest
} from 'fastify'

import { login } from './auth.service'
import { ok } from '../../core/http/response'
import { loginSchema } from './schemas/login.schema'

export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
    const body = loginSchema.parse(
      req.body
    )

    const user = await login(body)

    const token = await reply.jwtSign({
      id: user.id,
      role: user.role
    })

    return reply.send(
      ok(
        {
          token,
          user
        },
        'LOGIN_SUCCESS'
      )
    )

}