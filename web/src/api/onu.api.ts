import { api } from '../shared/lib/api'

export async function getUnregisteredOnus() {
  const response = await api.get('/onu/unregistered')
  return response.data.data
}

export async function authorizeOnu(
  payload: {
    macAddress: string

    endpoint: {
      type: string
      name: string
      address: string
    }
  }
) {

  const response =
    await api.post(
      '/onu/authorize',
      payload
    )

  return response.data
}