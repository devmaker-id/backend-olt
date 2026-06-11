export interface AuthorizeOnuRequest {
  macAddress: string

  endpoint: {
    type: 'CUSTOMER'
    name: string
    address: string
  }
}
export interface UnauthorizedOnu {

  id: string

  oltId: string

  onuComtName: string

  onuName: string

  status: string

  macAddress: string

  eponPort: string

  onuId: string

  discoveredAt: string

  createdAt: string
}