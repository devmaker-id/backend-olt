import { EndpointType } from '@prisma/client'

export interface CreateEndpointDto {
  internetNo: string
  type: EndpointType
  name: string
  code?: string
  address?: string
  latitude?: number
  longitude?: number
  description?: string
}

export interface UpdateEndpointDto {
  type?: EndpointType
  name?: string
  code?: string
  address?: string
  latitude?: number
  longitude?: number
  description?: string
}

export interface EndpointParams {
  id: string
}