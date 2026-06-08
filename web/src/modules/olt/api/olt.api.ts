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
export async function createOlt(data:any) {
  const response = await api.post('/olt', data)
  return response.data.data
}
export async function updateOlt(
  id: string,
  data: any
) {
  const response = await api.put(
    `/olt/${id}`,
    data
  )
  return response.data.data
}
export async function deleteOlt(id:string) {
  const response = await api.delete(`/olt/${id}`)
  return response.data.data
}