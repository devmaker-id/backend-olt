import { z } from 'zod'

export const changePasswordSchema =
  z.object({

    oldPassword:z.string(),

    newPassword:z.string().min(6),

  })

export type ChangePasswordDto =
  z.infer<
    typeof changePasswordSchema
  >