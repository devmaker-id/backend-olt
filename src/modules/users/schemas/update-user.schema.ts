import { Role } from '@prisma/client'
import { z } from 'zod'

export const updateUserSchema =
  z.object({

    username:
      z.string()
      .min(3)
      .max(50)
      .optional(),

    role:
      z.nativeEnum(Role)
      .optional(),

    email:
      z.string()
      .email()
      .optional(),

    telepon:
      z.string()
      .optional(),

    alamat:
      z.string()
      .optional(),

    telegramId:
      z.string()
      .optional(),

  })

export type UpdateUserDto =
  z.infer<
    typeof updateUserSchema
  >