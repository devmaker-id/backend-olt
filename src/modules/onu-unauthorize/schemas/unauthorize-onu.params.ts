import {z} from 'zod'

export const unauthorizeOnuIdParam = z.object({
    id: z.string().min(1)
})
export const unauthorizeOnuMacAddressParam = z.object({
    macAddress: z.string().min(1)
})
export const unauthorizeOnuSerialNumberParam = z.object({
    serialNumber: z.string().min(1)
})