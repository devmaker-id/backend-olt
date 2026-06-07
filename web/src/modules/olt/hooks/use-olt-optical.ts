import {
  useQuery
} from '@tanstack/react-query'

import {
  getOltOptical
} from '../api/olt.api'

import type {
  OltOptical
} from '../types/olt.types'

export function useOltOptical(
  id: string
) {

  return useQuery<
    OltOptical[]
  >({

    queryKey: [
      'olt-optical',
      id
    ],

    queryFn: () =>
      getOltOptical(id),

    enabled: !!id
  })
}