import { api } from '../../../shared/lib/api'
import type { ReplaceOnuPayload } from '../types/onu-replacement.types'

export async function getOnuReplacements() {
  const response = await api.get('/onu-replacement')
  return response.data.data
}
export async function getOnuReplacement(id: string) {
  const response = await api.get(`/onu-replacement/${id}`)
  return response.data.data
}

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