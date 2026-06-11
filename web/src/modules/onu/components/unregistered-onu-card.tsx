import {
  Button,
} from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type {
  UnauthorizedOnu,
} from '../types/onu.types'

interface Props {
  onu: UnauthorizedOnu

  onAuthorize: (
    onu: UnauthorizedOnu
  ) => void
}

export function UnregisteredOnuCard({
  onu,
  onAuthorize,
}: Props) {

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          {onu.onuId}
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          space-y-2
          text-sm
        "
      >

        <div>

          <span className="font-medium">
            EPON:
          </span>

          {' '}

          {onu.eponPort}

        </div>

        <div>

          <span className="font-medium">
            MAC:
          </span>

          {' '}

          {onu.macAddress}

        </div>

        <div>

          <span className="font-medium">
            Name:
          </span>

          {' '}

          {onu.onuName || '-'}

        </div>

        <div>

          <span className="font-medium">
            Comment:
          </span>

          {' '}

          {onu.onuComtName || '-'}

        </div>

        <Button
          className="w-full"
          onClick={() =>
            onAuthorize(
              onu,
            )
          }
        >
          Authorize
        </Button>

      </CardContent>

    </Card>
  )
}