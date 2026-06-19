import {z} from 'zod'

export const paramsOltById = z.object({
    id: z.string().min(1)
})