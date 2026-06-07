import { useQuery } from '@tanstack/react-query'
import { getUnauthorizedOnus } from '../api/onu.api'
import type { UnauthorizedOnu } from '../types/onu.types'

export function useUnauthorizedOnus() {

  return useQuery<UnauthorizedOnu[]>({

    queryKey: [
      'unauthorized-onus'
    ],

    queryFn:
      getUnauthorizedOnus
  })
}