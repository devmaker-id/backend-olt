import { z } from 'zod'
import {SyslogEventType} from '@prisma/client'

export const syslogEventShema = z.object({
    oltId: z.string().optional(),
    onuIdRef: z.string().optional(),
    type: z.nativeEnum(SyslogEventType),
    sourceIp: z.string().min(1),
    oltName: z.string().optional(),
    portId: z.string().optional(),
    onuId: z.string().optional(),
    onuMac: z.string().optional(),
    serialNumber: z.string().optional(),
    onuName: z.string().optional(),
    rawLog: z.string().min(1),
    payload: z.record(z.string(), z.unknown()).default({})
})

export type syslogEventDto = z.infer<
    typeof syslogEventShema
>