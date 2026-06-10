import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface Props {
  onu?: any
}

export function EndpointOnuCard({
  onu
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Database ONU
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
            ONU ID
          </p>

          <p>
            {onu?.onuId ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            EPON Port
          </p>

          <p>
            {onu?.eponPort ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            MAC Address
          </p>

          <p>
            {onu?.onuMac ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p>
            {onu?.connectionState ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            RX Power
          </p>

          <p>
            {onu?.rxPower ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            TX Power
          </p>

          <p>
            {onu?.txPower ?? '-'}
          </p>
        </div>

      </CardContent>

    </Card>
  )
}