import {
    OltPlatform,
    OltConnectionType,
} from '@prisma/client'
import { z } from 'zod'

export const updateOltSchema = z.object({
    name: z.string().min(1),
    syslogName: z.string().min(1),
    managementPort: z.number().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
    vendor: z.string().min(1),
    platform: z.nativeEnum(OltPlatform),
    connectionType: z.nativeEnum(OltConnectionType),
    location: z.string().min(1)
})

export type updateOltDto = z.infer<
    typeof updateOltSchema
>