export interface CreateOnuEventDto {
  onuId: string
  event: string
  oldState?: string
  newState?: string
  source?: string
  description?: string
}