import {
  useQuery
} from '@tanstack/react-query'

import {
  getOlts
} from '../api/olt.api'

export function useOlts() {

  return useQuery({

    queryKey: [
      'olts'
    ],

    queryFn:
      getOlts
  })
}