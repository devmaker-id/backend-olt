import { api } from '../../../shared/lib/api'

export async function getUnauthorizedOnus() {

  const response =
    await api.get(
      '/onu/unregistered'
    )

  return response.data.data
}