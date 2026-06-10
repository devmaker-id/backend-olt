import {

  Table,

  TableBody,

  TableCell,

  TableHead,

  TableHeader,

  TableRow

} from '@/components/ui/table'

import {
  EndpointActions
} from './endpoint-actions'

import {
  EndpointStatusBadge
} from './endpoint-status-badge'

interface Props {
  data: any[]
}

export function EndpointTable({
  data
}: Props) {

  return (

    <div
      className="
        rounded-md
        border
      "
    >

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Internet No
            </TableHead>

            <TableHead>
              Name
            </TableHead>

            <TableHead>
              Address
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              RX Power
            </TableHead>

            <TableHead>
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {
            data.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={6}
                  className="
                    text-center
                  "
                >

                  No endpoint found

                </TableCell>

              </TableRow>

            )
          }

          {
            data.map(
              (endpoint: any) => {

                const onu =
                  endpoint.onus?.[0]

                return (

                  <TableRow
                    key={endpoint.id}
                  >

                    <TableCell>

                      {
                        endpoint.internetNo
                      }

                    </TableCell>

                    <TableCell>

                      {
                        endpoint.name
                      }

                    </TableCell>

                    <TableCell>

                      {
                        endpoint.address
                      }

                    </TableCell>

                    <TableCell>

                      <EndpointStatusBadge

                        status={
                          onu?.connectionState
                        }

                      />

                    </TableCell>

                    <TableCell>

                      {
                        onu?.rxPower
                        ||
                        '-'
                      }

                    </TableCell>

                    <TableCell>

                      <EndpointActions

                        endpointId={
                            endpoint.id
                        }

                        endpointName={
                            endpoint.name
                        }

                      />

                    </TableCell>

                  </TableRow>

                )
              }
            )
          }

        </TableBody>

      </Table>

    </div>
  )
}