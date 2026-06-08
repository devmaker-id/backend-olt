import { useQuery }
from '@tanstack/react-query'

import {
  getOnuReplacement
} from '../api/onu-replacement.api'

export function
useOnuReplacement(
  id: string
) {

  return useQuery({

    queryKey: [
      'onu-replacement',
      id
    ],

    queryFn: () =>
      getOnuReplacement(id),

    enabled: !!id
  })
}