import {
  Badge
} from '@/components/ui/badge'

interface Props {
  status?: string
}

export function EndpointStatusBadge({
  status
}: Props) {

  switch (status) {

    case 'ONLINE':
      return (
        <Badge>
          ONLINE
        </Badge>
      )

    case 'OFFLINE':
      return (
        <Badge
          variant="destructive"
        >
          OFFLINE
        </Badge>
      )

    case 'ONU_POWER_OFF':
      return (
        <Badge
          variant="secondary"
        >
          POWER OFF
        </Badge>
      )

    case 'FIBER_LOS':
      return (
        <Badge
          variant="destructive"
        >
          LOS
        </Badge>
      )

    default:
      return (
        <Badge
          variant="outline"
        >
          UNKNOWN
        </Badge>
      )
  }
}