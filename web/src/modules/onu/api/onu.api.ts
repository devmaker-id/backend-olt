import { api } from '../../../shared/lib/api'
import type {
  AuthorizeOnuRequest,
} from '../types/onu.types'

export async function getUnauthorizedOnus() {

  const response =
    await api.get(
      '/onu/unregistered'
    )

  return response.data.data
}

export async function authorizeOnu(
  payload: AuthorizeOnuRequest
) {

  const response =
    await api.post(
      '/onu/authorize',
      payload
    )

  return response.data
}