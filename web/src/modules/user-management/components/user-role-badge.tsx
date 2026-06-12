import {
  Badge,
} from '@/components/ui/badge'

import type {
  UserRole,
} from '../types/user-management.types'

interface Props {
  role: UserRole
}

export function UserRoleBadge({
  role,
}: Props) {

  return (

    <Badge
      variant={
        role === 'OWNER'
          ? 'default'
          : 'secondary'
      }
    >

      {role}

    </Badge>

  )

}