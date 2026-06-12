import type {
  FastifyInstance,
} from 'fastify'

import {
  authMiddleware,
} from '../../middleware/auth.middleware'
import { roleMiddleware } from '../../middleware/role.middleware'

import {
  createUserController,
  updateUserController,
  getCurrentUserController,
  updateProfileController,
  changePasswordController,
  resetPasswordController,
  getUsersController,
  getUserByIdController,
  deleteUserController,
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

  /*
   * Management
   * OWNER Only
   */

  app.get(
    '/:id',
    {
      preHandler: [
        authMiddleware,
        roleMiddleware(
          'OWNER'
        )
      ],
    },
    getUserByIdController,
  )
  app.post(
    '/',
    {
      preHandler: [
        authMiddleware,
        roleMiddleware(
          'OWNER'
        )
      ],
    },
    createUserController,
  )
  app.patch(
    '/:id',
    {
      preHandler: [
        authMiddleware,
        roleMiddleware(
          'OWNER'
        )
      ],
    },
    updateUserController,
  )
  app.patch(
    '/:id/reset-password',
    {
      preHandler: [
        authMiddleware,
        roleMiddleware(
          'OWNER',
        ),
      ],
    },
    resetPasswordController,
  )
  app.delete(
    '/:id',
    {
      preHandler: [
        authMiddleware,
        roleMiddleware(
          'OWNER'
        )
      ],
    },
    deleteUserController,
  )

}