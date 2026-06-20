import {
  TelegramRole
} from '@prisma/client'
import {z} from 'zod'

export const createTelegramSchema = z.object({
  telegramId: z.string().min(1),
  username: z.string().optional(),
  fullName: z.string().optional(),
  role: z.nativeEnum(TelegramRole)
})

export type createTelegramSchema = z.infer<
  typeof createTelegramSchema
>

export const updateTelegramSchema = z.object({
  username: z.string().optional(),
  fullName: z.string().optional(),
  role: z.nativeEnum(TelegramRole).optional(),
  isActive: z.boolean().optional()
})

export type updateTelegramSchemaDto = z.infer<
  typeof updateTelegramSchema
>

export const telegramUserIdParams = z.object({
  id: z.string().min(1)
})