import {
    OnuStatus,
} from '@prisma/client';

import { z } from 'zod';

export const paramsCreateOnuSchema = z.object({
    unauthorizeId: z.string().min(1),
    endpointId: z.string().min(1)
})

export const createOnuSchema = z.object({
    oltId: z.string().min(1),

    endpointId: z.string().min(1),
    unauthorizeId: z.string().min(1),
    status: z.nativeEnum(OnuStatus),
    
    portId: z.string().min(1),
    onuId: z.string().min(1),

    serialNumber: z.string().optional(),
    onuMac: z.string().optional(),

    onuName: z.string().min(1),
    onuType: z.string().optional(),
    model: z.string().optional(),
    frimware: z.string().optional(),
    temperature: z.string().optional(),
    voltage: z.string().optional(),
    txBias: z.string().optional(),
    txPower: z.string().optional(),
    rxPower: z.string().optional(),
    isActive: z.boolean(),
})

export type createOnuDto = z.infer<
    typeof createOnuSchema
>