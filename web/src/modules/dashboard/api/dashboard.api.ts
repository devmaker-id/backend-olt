import { api } from '../../../shared/lib/api'

export async function getSummary() {
  const response = await api.get( '/onu/inventory/summary' )
  return response.data.data
}