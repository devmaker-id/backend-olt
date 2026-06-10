import { Input } from '@/components/ui/input'

interface Props {
  search: string

  onSearchChange: (
    value: string
  ) => void
}

export function TelegramUserToolbar({
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex items-center gap-4">

      <Input
        value={search}
        placeholder="Search username or fullname..."
        onChange={(event) =>
          onSearchChange(
            event.target.value,
          )
        }
      />

    </div>
  )
}