import { z } from 'zod'

export const syslogEventParamsId = z.object({
    id: z.string().min(1)
})