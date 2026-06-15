import { z } from 'zod'

export const resetPasswordSchema =
  z.object({
    password: z.string().min(6),
  })

export type ResetPasswordDto = z.infer<
    typeof resetPasswordSchema
    >