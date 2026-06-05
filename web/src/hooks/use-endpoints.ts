import { useQuery } from '@tanstack/react-query'
import { getEndpoints } from '../api/endpoint.api'
import type { Endpoint } from '../modules/endpoint/types/endpoint.types'

export function useEndpoints() {
  return useQuery<Endpoint[]>({
    queryKey: ['endpoints'],
    queryFn: getEndpoints
  })
}