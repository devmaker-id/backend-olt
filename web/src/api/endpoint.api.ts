import { api } from '../shared/lib/api'

export async function getEndpoints() {
  const response =
    await api.get('/endpoint')

  return response.data
}