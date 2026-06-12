import {
  Input,
} from '@/components/ui/input'

interface Props {
  search: string

  onSearchChange: (
    value: string
  ) => void
}

export function OnuReplacementToolbar({
  search,
  onSearchChange,
}: Props) {

  return (
    <Input
      placeholder="Search internet no, customer, old ONU, new ONU"
      value={search}
      onChange={event =>
        onSearchChange(
          event.target.value,
        )
      }
    />
  )
}