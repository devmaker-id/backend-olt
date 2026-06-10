import { api } from '../../../shared/lib/api'

import type {
  CreateEndpointDto,
  UpdateEndpointDto
} from '../types/endpoint.types'

export async function
getEndpoints() {

  const response =
    await api.get(
      '/endpoint'
    )

  return response.data
}

export async function
getEndpointById(
  id: string
) {

  const response =
    await api.get(
      `/endpoint/${id}`
    )

  return response.data
}

export async function
createEndpoint(
  data: CreateEndpointDto
) {

  const response =
    await api.post(

      '/endpoint',

      data
    )

  return response.data
}

export async function
updateEndpoint(

  id: string,

  data: UpdateEndpointDto
) {

  const response =
    await api.put(

      `/endpoint/${id}`,

      data
    )

  return response.data
}

export async function
deleteEndpoint(
  id: string
) {

  const response =
    await api.delete(
      `/endpoint/${id}`
    )

  return response.data
}

export async function
getRealtimeEndpoint(
  internetNo: string
) {

  const response =
    await api.get(
      `/endpoint/internet/${internetNo}`
    )

  return response.data.result.data
}