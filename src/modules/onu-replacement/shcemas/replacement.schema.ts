import { z } from 'zod'

export const replacementSchema = z.object({
    endpointId: z.string().min(1),
    unauthorizedOnuId: z.string().min(1),
    reason: z.string().optional(),
    replacedBy: z.string().optional()
})

export type replacementSchemaDto = z.infer<
    typeof replacementSchema
>