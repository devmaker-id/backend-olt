import { z } from 'zod'

export const userIdParamSchema =
  z.object({
    id: z.string().cuid()
  })

export type UserIdParamDto =
  z.infer<
    typeof userIdParamSchema
  >