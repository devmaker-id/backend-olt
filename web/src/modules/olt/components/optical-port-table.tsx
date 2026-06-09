import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  OpticalStatusBadge,
} from './optical-status-badge'

interface OpticalPort {
  port: string
  status: string
  temperature: string
  voltage: string
  txBias: string
  txPower: string
}

interface Props {
  ports: OpticalPort[]
}

export function OpticalPortTable({
  ports,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Port
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead>
            Temperature
          </TableHead>

          <TableHead>
            Voltage
          </TableHead>

          <TableHead>
            Tx Bias
          </TableHead>

          <TableHead>
            Tx Power
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {ports.map(
          (port) => (
            <TableRow
              key={port.port}
            >
              <TableCell>
                {port.port}
              </TableCell>

              <TableCell>
                <OpticalStatusBadge
                  status={
                    port.status
                  }
                />
              </TableCell>

              <TableCell>
                {
                  port.temperature
                }
              </TableCell>

              <TableCell>
                {port.voltage}
              </TableCell>

              <TableCell>
                {port.txBias}
              </TableCell>

              <TableCell>
                {port.txPower}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}