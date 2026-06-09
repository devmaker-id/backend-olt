import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type {
  Olt
} from '../types/olt.types'

import {
  OltVendorBadge
} from './olt-vendor-badge'

import {
  OltActions
} from './olt-actions'

interface Props {
  olts: Olt[]

  onDelete: (
    olt: Olt
  ) => void
}

export function OltTable({
  olts,
  onDelete,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Name
          </TableHead>

          <TableHead>
            Syslog
          </TableHead>

          <TableHead>
            IP Address
          </TableHead>

          <TableHead>
            Vendor
          </TableHead>

          <TableHead>
            Location
          </TableHead>

          <TableHead>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {olts.map(
          (olt) => (
            <TableRow
              key={olt.id}
            >
              <TableCell>
                {olt.name}
              </TableCell>

              <TableCell>
                {olt.syslogName}
              </TableCell>

              <TableCell>
                {olt.ipAddress}
              </TableCell>

              <TableCell>
                <OltVendorBadge
                  vendor={
                    olt.vendor
                  }
                />
              </TableCell>

              <TableCell>
                {olt.location}
              </TableCell>

              <TableCell>
                <OltActions
                  id={olt.id}
                  onDelete={() => {
                    onDelete(olt)
                  }}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}