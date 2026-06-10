import { Input } from '@/components/ui/input'

interface Props {
  search: string

  onSearchChange: (
    value: string
  ) => void
}

export function TelegramBotToolbar({
  search,
  onSearchChange,
}: Props) {
  return (
    <Input
      value={search}
      placeholder="Search bot..."
      onChange={(event) =>
        onSearchChange(
          event.target.value,
        )
      }
    />
  )
}