import {
  Button
} from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue

} from '@/components/ui/select'

interface Props {

  selectedId: string

  onSelectedChange: (
    value: string
  ) => void

  unauthorizedOnus: any[]

  isPending: boolean

  onReplace: () => void
}

export function EndpointReplaceOnuCard({

  selectedId,

  onSelectedChange,

  unauthorizedOnus,

  isPending,

  onReplace

}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Replace ONU
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          space-y-4
        "
      >

        <Select

          value={selectedId}

          onValueChange={
            onSelectedChange
          }

        >

          <SelectTrigger>

            <SelectValue
              placeholder="Select Unauthorized ONU"
            />

          </SelectTrigger>

          <SelectContent>

            {
              unauthorizedOnus.map(
                (onu) => (

                  <SelectItem

                    key={onu.id}

                    value={onu.id}

                  >

                    {onu.macAddress}
                    {' - '}
                    {onu.eponPort}
                    :
                    {onu.onuId}

                  </SelectItem>

                )
              )
            }

          </SelectContent>

        </Select>

        <Button

          disabled={
            !selectedId ||
            isPending
          }

          onClick={onReplace}

        >

          {
            isPending

              ? 'Replacing...'

              : 'Replace ONU'
          }

        </Button>

      </CardContent>

    </Card>
  )
}