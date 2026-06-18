import { OpticStatus } from '@prisma/client'
import {z} from 'zod'

export const createOnuUnauthorizeSchema = z.object({
    oltId: z.string().min(1),
    onuComtName: z.string().min(1),
    onuName: z.string().min(1),
    status: z.nativeEnum(OpticStatus),

    serialNumber: z.string().min(1),
    macAddress: z.string().min(1),

    portId: z.string().min(1),
    onuId: z.string().min(1),
})

export type createOnuUnauthorizeDto = z.infer<
    typeof createOnuUnauthorizeSchema
>