import {z} from 'zod'

export const unauthorizeOnuIdParam = z.object({
    id: z.string().min(1)
})