import { z } from 'zod'

export const endpointIdParamSchema = z.object({
    id: z.string().min(1),
  })

export type EndpointIdParamDto =
  z.infer<
    typeof endpointIdParamSchema
  >