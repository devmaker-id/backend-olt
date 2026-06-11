import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  value: number

  onChange: (
    value: number
  ) => void

  options?: number[]
}

export function PageSizeSelect({
  value,
  onChange,
  options = [
    10,
    25,
    50,
    100,
  ],
}: Props) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <span
        className="
          text-sm
          text-muted-foreground
        "
      >
        Show
      </span>

      <Select
        value={
          String(value)
        }
        onValueChange={(
          value,
        ) =>
          onChange(
            Number(value),
          )
        }
      >

        <SelectTrigger
          className="w-20"
        >

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          {options.map(
            option => (

              <SelectItem
                key={option}
                value={
                  String(
                    option,
                  )
                }
              >
                {option}
              </SelectItem>

            ),
          )}

        </SelectContent>

      </Select>

    </div>

  )
}