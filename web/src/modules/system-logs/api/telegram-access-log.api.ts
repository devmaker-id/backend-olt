import { api } from '../../../shared/lib/api'

export async function getTelegramAccessLogs() {
  const response = await api.get(
    '/telegram-bots/access-logs'
  )

  return response.data
}
export async function deleteTelegramAccessLog(
  id: string
) {
  const response =
    await api.delete(
      `/telegram-bots/access-logs/${id}`
    )
  console.log(response)
  return response.data
}