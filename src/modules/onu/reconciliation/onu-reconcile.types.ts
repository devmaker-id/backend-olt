import { ConnectionState } from '@prisma/client'

export interface CreateOnuEventDto {
  onuId: string
  event: string
  oldState?: string
  newState?: string
  source?: string
  description?: string
}

export interface ReconcileResult {
  success: boolean
  changed: boolean
  message: string
  oldState?: ConnectionState | null
  newState?: ConnectionState | null
}