import { Badge } from '@/components/ui/badge'

import type {
  TelegramRole,
} from '../types/telegram.types'

interface Props {
  role: TelegramRole
}

export function TelegramUserRoleBadge({
  role,
}: Props) {
  return (
    <Badge
      variant={
        role === 'ADMIN'
          ? 'default'
          : 'secondary'
      }
    >
      {
        role === 'ADMIN'
          ? '👑 ADMIN'
          : '🔧 TEKNISI'
      }
    </Badge>
  )
}