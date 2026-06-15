import { z } from 'zod'

export const updateProfileSchema =
  z.object({
    username: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    telepon: z.string().optional(),
    alamat: z.string().optional(),
    telegramId: z.string().optional(),
  })

export type UpdateProfileDto =
  z.infer<
    typeof updateProfileSchema
  >