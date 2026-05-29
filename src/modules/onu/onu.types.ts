import { EndpointType }
  from '@prisma/client'

export interface AuthorizeOnuDto {
  macAddress: string
  endpoint: {
    type: EndpointType
    name: string
    onuComtName?: String
    temperature?: String
    voltage?: String
    txBias?: String
    txPower?: String
    rxPower?: String
    code?: string
    address?: string
    description?: string
    latitude?: number
    longitude?: number
  }
  packageId?: string,
}

// RESPONSE AUTHORIZE

export interface AuthorizeOnuResult {
  success: boolean
  message: string
  data: {
    internetNo: string |null
    name: string | null
    type: EndpointType
    macAddress: string
    port: string
  } | null
}