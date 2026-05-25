import { FastifyInstance } from 'fastify'

import { authMiddleware } from '../../middleware/auth.middleware'

export async function userRoutes(
  app: FastifyInstance
) {
  app.get(
    '/me',
    {
      preHandler: [authMiddleware]
    },
    async (req) => {
      return {
        user: req.user
      }
    }
  )
}