import {
  Input,
} from '@/components/ui/input'

interface Props {
  search: string

  onSearchChange: (
    value: string
  ) => void
}

export function UnregisteredOnuToolbar({
  search,
  onSearchChange,
}: Props) {

  return (
    <Input
      placeholder="Search ONU, MAC Address, ONU ID"
      value={search}
      onChange={event =>
        onSearchChange(
          event.target.value,
        )
      }
    />
  )
}