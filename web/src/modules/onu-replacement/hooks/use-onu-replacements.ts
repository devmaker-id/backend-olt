import { useQuery }
from '@tanstack/react-query'

import {
  getOnuReplacements
} from '../api/onu-replacement.api'

export function
useOnuReplacements() {

  return useQuery({

    queryKey: [
      'onu-replacements'
    ],

    queryFn:
      getOnuReplacements
  })
}