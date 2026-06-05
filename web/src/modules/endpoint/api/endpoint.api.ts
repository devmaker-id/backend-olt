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