export interface ReplaceOnuDto {
  endpointId: string
  unauthorizedOnuId: string
  reason?: string
  replacedBy?: string
}