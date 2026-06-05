import { api }
from '../../../shared/lib/api'

export async function getEndpointById(
  id: string
) {

  const response =
    await api.get(
      `/endpoint/${id}`
    )

  return response.data
}

export async function getRealtimeEndpoint(
  internetNo: string
) {

  const response =
    await api.get(
      `/endpoint/internet/${internetNo}`
    )

  return response.data.result.data
}