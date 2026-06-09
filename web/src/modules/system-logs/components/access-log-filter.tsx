import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AccessLogFilterProps {
  value: string
  onChange: (value: string) => void
}

export function AccessLogFilter({
  value,
  onChange,
}: AccessLogFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          All Logs
        </SelectItem>

        <SelectItem value="authorized">
          Authorized
        </SelectItem>

        <SelectItem value="unauthorized">
          Unauthorized
        </SelectItem>
      </SelectContent>
    </Select>
  )
}