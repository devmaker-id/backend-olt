import {api} from '../../../shared/lib/api'

export async function getOltOptical(
  id: string
) {
  const response = await api.get(
      `/olt/${id}/optical`
    )
  return response.data.data.data
}
export async function getOlts() {
  const response =
    await api.get(
      '/olt'
    )
  return response.data
}
export async function getOlt(
  id: string
) {

  const response =
    await api.get(
      `/olt/${id}`
    )

  return response.data
}
export async function connectOlt(
  id: string
) {

  const response =
    await api.get(
      `/olt/${id}/connect`
    )
  return response.data
}