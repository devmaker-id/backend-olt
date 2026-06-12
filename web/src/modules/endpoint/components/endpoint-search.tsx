import {
  Input
} from '@/components/ui/input'

interface EndpointSearchProps {

  value: string

  onChange: (
    value: string
  ) => void
}

export function EndpointSearch({
  value,
  onChange
}: EndpointSearchProps) {
  return (
    <Input
      placeholder="Search internet no, name or address..."
      value={value}
      onChange={(event) =>
        onChange(
          event.target.value
        )
      }
      className="max-w-md"
    />
  )
}