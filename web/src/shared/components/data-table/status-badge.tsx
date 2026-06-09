import { Badge } from '@/components/ui/badge'

interface Props {
  active: boolean

  activeText?: string
  inactiveText?: string
}

export function StatusBadge({
  active,
  activeText = 'Active',
  inactiveText = 'Inactive',
}: Props) {
  return (
    <Badge
      variant={
        active
          ? 'default'
          : 'secondary'
      }
    >
      {active
        ? activeText
        : inactiveText}
    </Badge>
  )
}