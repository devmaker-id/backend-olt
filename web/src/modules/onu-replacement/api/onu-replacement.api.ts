import { api } from '../../../shared/lib/api'
import type { ReplaceOnuPayload } from '../types/onu-replacement.types'

export async function replaceOnu(
  payload: ReplaceOnuPayload
) {

  const response =
    await api.post(
      '/onu-replacement',
      payload
    )

  return response.data.data
}