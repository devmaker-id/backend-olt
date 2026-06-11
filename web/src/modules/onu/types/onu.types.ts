// import type { EndpointType } from "@/modules/endpoint/types/endpoint.types"
import {EndpointType} from '@prisma/client'
export interface AuthorizeOnuRequest {
  macAddress: string
  endpoint: {
    type: EndpointType
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