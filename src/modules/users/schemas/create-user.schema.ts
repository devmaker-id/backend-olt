import { z } from 'zod'
import { Role } from '@prisma/client'

export const createUserSchema =
  z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6),
    role: z.nativeEnum(Role),
    email: z.string().email().min(1),
    telepon: z.string().min(1),
    alamat: z.string().min(1),
    telegramId: z.string().min(1),

  })

export type CreateUserDto =
  z.infer<typeof createUserSchema>