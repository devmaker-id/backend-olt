import type { FastifyInstance } from 'fastify'
import { Role } from '@prisma/client'

import { authMiddleware } from '../../middleware/auth.middleware'
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

  const ownerOnly = [
    authMiddleware,
    roleMiddleware(
      Role.OWNER
    )
  ]
  const authenticated = [
    authMiddleware
  ]

  app.get(
    '/me',
    {
      preHandler: authenticated,
    },
    getCurrentUserController,
  )

  app.patch(
    '/me',
    {
      preHandler: authenticated,
    },
    updateProfileController,
  )

  app.patch(
    '/password',
    {
      preHandler: authenticated,
    },
    changePasswordController,
  )
  
  /*
   * Management
   * OWNER Only
   */

  app.get(
    '/',
    {
      preHandler: ownerOnly,
    },
    getUsersController,
  )

  app.get(
    '/:id',
    {
      preHandler: ownerOnly,
    },
    getUserByIdController,
  )
  app.post(
    '/',
    {
      preHandler: ownerOnly,
    },
    createUserController,
  )
  app.patch(
    '/:id',
    {
      preHandler: ownerOnly,
    },
    updateUserController,
  )
  app.patch(
    '/:id/reset-password',
    {
      preHandler: ownerOnly,
    },
    resetPasswordController,
  )
  app.delete(
    '/:id',
    {
      preHandler: ownerOnly,
    },
    deleteUserController,
  )

}