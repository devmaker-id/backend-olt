import type {
  FastifyInstance,
} from 'fastify'

import {
  authMiddleware,
} from '../../middleware/auth.middleware'

import {
  createUserController,
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
  app.post(
    '/',
    {
      preHandler:
        authMiddleware,
    },
    createUserController,
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