import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  Badge
} from '@/components/ui/badge'

interface Props {
  realtime: any
}

export function EndpointRealtimeCard({
  realtime
}: Props) {

  const signal =
    realtime?.onu?.signalStatus

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Realtime ONU
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
            Status
          </p>

          <p>
            {realtime.onu.status}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Signal
          </p>

          <Badge>
            {signal}
          </Badge>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Port
          </p>

          <p>
            {realtime.onu.port}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Model
          </p>

          <p>
            {realtime.onu.model}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            RX Power
          </p>

          <p>
            {realtime.onu.rxPower}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            TX Power
          </p>

          <p>
            {realtime.onu.txPower}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Temperature
          </p>

          <p>
            {realtime.onu.temperature}
          </p>

        </div>

        <div>

          <p className="text-sm text-muted-foreground">
            Offline Count
          </p>

          <p>
            {realtime.onu.offlineCount}
          </p>

        </div>

      </CardContent>

    </Card>
  )
}