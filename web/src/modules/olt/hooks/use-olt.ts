import {
  useQuery
} from '@tanstack/react-query'

import {
  getOlt
} from '../api/olt.api'

export function useOlt(
  id: string
) {

  return useQuery({

    queryKey: [
      'olt',
      id
    ],

    queryFn: () =>
      getOlt(id),

    enabled: !!id
  })
}