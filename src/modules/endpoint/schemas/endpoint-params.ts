import { z } from 'zod'

export const endpointIdParamSchema = z.object({
    id: z.string().min(1),
  })
export const endpointInternetNoParamSchema = z.object({
    internetNo: z.string().min(1),
  })
export const endpointEmailParamSchema = z.object({
    email: z.string().min(1),
  })
