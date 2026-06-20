import { z } from 'zod'

export const onuQuerySchema = z.object({
    portid: z.string().min(1),
    onuid: z.string().min(1)
})

export const queryOnuLists = z.object({
    portid: z.string().min(1)
})