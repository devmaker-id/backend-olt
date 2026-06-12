import {
  Input,
} from '@/components/ui/input'

interface Props {

  search: string

  onSearchChange: (
    value: string
  ) => void

}

export function UserToolbar({
  search,
  onSearchChange,
}: Props) {

  return (

    <Input
      placeholder="Search username or role"
      value={search}
      onChange={event =>
        onSearchChange(
          event.target.value,
        )
      }
    />

  )

}