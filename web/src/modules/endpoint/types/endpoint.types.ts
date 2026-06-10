// export interface Endpoint {
//   id: string
//   internetNo: string
//   name: string
//   address: string

//   onus: {
//     id: string
//     connectionState: string
//     rxPower: string | null
//   }[]
// }

export type EndpointType =
  | 'CUSTOMER'
  | 'RESELLER'
  | 'POP'
  | 'BACKHAUL'

export interface Endpoint {

  id: string

  internetNo: string

  type: EndpointType

  name: string

  code?: string

  address?: string

  latitude?: number

  longitude?: number

  description?: string

  createdAt: string

  updatedAt: string
}

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

export interface UpdateEndpointMutationDto {

  id: string

  data: UpdateEndpointDto
}

export interface DeleteEndpointMutationDto {

  id: string
}