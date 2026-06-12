import { useMutation }
  from '@tanstack/react-query'

import {
  changePassword,
} from '../api/users.api'

export function
useChangePassword() {

  return useMutation({

    mutationFn:
      changePassword,

  })

}