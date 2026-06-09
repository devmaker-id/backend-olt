import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type {
  Olt,
} from '../types/olt.types'

interface Props {
  olt: Olt
}

export function OltInfoCard({
  olt,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          OLT Information
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
          <strong>Name</strong>
          <p>{olt.name}</p>
        </div>

        <div>
          <strong>Vendor</strong>
          <p>{olt.vendor}</p>
        </div>

        <div>
          <strong>IP Address</strong>
          <p>{olt.ipAddress}</p>
        </div>

        <div>
          <strong>Location</strong>
          <p>
            {olt.location ??
              '-'}
          </p>
        </div>

        <div>
          <strong>Syslog</strong>
          <p>
            {olt.syslogName}
          </p>
        </div>

        <div>
          <strong>Telnet Port</strong>
          <p>
            {olt.telnetPort}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}