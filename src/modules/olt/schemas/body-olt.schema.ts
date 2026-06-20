import { z } from 'zod'

export const bodyOltAsyncSchema = z.object({
    oltId: z.string().min(1),
    portId: z.string().min(1)
})