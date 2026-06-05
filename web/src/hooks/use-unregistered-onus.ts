import { useQuery } from '@tanstack/react-query'
import { getUnregisteredOnus } from '../api/onu.api'
import type { UnregisteredOnu } from '../types/onu.types'

export function useUnregisteredOnus() {

  return useQuery<UnregisteredOnu[]>({
    queryKey: [
      'unregistered-onus'
    ],
    queryFn:
      getUnregisteredOnus
  })
}