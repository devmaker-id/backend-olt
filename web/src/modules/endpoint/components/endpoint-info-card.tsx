import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import type {
  Endpoint
} from '../types/endpoint.types'

interface Props {
  endpoint: Endpoint
}

export function EndpointInfoCard({
  endpoint
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Endpoint Information
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >

        <div>
          <p className="text-sm text-muted-foreground">
            Internet No
          </p>

          <p>
            {endpoint.internetNo}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Type
          </p>

          <p>
            {endpoint.type}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Name
          </p>

          <p>
            {endpoint.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Address
          </p>

          <p>
            {endpoint.address ?? '-'}
          </p>
        </div>

      </CardContent>

    </Card>
  )
}