import { z } from 'zod'

export const paramsOnuIdSchema = z.object({
    id: z.string().min(1)
})