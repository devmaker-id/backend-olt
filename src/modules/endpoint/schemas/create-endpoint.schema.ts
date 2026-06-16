import { EndpointType } from '@prisma/client'
import { nullable, z } from 'zod'

export const createEndpointSchema =
  z.object({
    type: z.nativeEnum(EndpointType),
    internetNo: z.string().min(6),
    name: z.string().min(1).max(50),
    email: z.string().min(1).max(50),
    telepon: z.string().min(1).max(15),
    address: z.string().min(1),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    description: z.string().optional(),
    packageId: z.string().optional(),
  })

export type CreateEndpointDto = z.infer<
    typeof createEndpointSchema
  >