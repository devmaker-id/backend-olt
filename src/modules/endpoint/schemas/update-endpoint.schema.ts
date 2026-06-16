import { EndpointType } from '@prisma/client'
import { z } from 'zod'

export const updateEndpointSchema =
  z.object({
    type: z.nativeEnum(EndpointType).optional(),
    name: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    telepon: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    description: z.string().optional(),
    packageId: z.string().min(1).optional()
  })

export type UpdateEndpointDto =
  z.infer<
    typeof updateEndpointSchema
  >