import { EndpointType }
  from '@prisma/client'

export interface AuthorizeOnuDto {

  macAddress: string

  endpoint: {

    type: EndpointType

    name: string

    code?: string

    address?: string

    description?: string

    latitude?: number

    longitude?: number
  }

  packageId?: string
}