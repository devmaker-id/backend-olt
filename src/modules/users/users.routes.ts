import type {
  FastifyInstance,
} from 'fastify'

import {
  authMiddleware,
} from '../../middleware/auth.middleware'

import {
  getCurrentUserController,
  updateProfileController,
  changePasswordController,
  getUsersController,
  getUserByIdController,
} from './users.controller'

export async function
usersRoutes(
  app: FastifyInstance,
) {

  app.get(
    '/me',
    {
      preHandler:
        authMiddleware,
    },
    getCurrentUserController,
  )

  app.patch(
    '/me',
    {
      preHandler:
        authMiddleware,
    },
    updateProfileController,
  )

  app.patch(
    '/password',
    {
      preHandler:
        authMiddleware,
    },
    changePasswordController,
  )

  app.get(
    '/',
    {
      preHandler:
        authMiddleware,
    },
    getUsersController,
  )

  app.get(
    '/:id',
    {
      preHandler:
        authMiddleware,
    },
    getUserByIdController,
  )

}