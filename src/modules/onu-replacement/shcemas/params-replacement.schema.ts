import { z } from 'zod'

export const paramsReplacementIdSchema = z.object({
    id: z.string().min(1)
})