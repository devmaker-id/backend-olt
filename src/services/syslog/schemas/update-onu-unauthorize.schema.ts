import { OpticStatus } from "@prisma/client";
import {z} from 'zod';

export const updateUnauthorizeOnuSchema = z.object({
    oltId: z.string().min(1),
    onuName: z.string().optional(),
    status: z.nativeEnum(OpticStatus),
    serialNumber: z.string().optional(),
    macAddress: z.string().optional(),
    portId: z.string().min(1),
    onuId: z.string().min(1)
})

export type updateUnauthorizeOnuSchema = z.infer<
    typeof updateUnauthorizeOnuSchema
>