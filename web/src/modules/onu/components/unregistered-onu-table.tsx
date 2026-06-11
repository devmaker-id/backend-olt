import {
  Button,
} from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type {
  UnauthorizedOnu,
} from '../types/onu.types'

interface Props {
  onus: UnauthorizedOnu[]

  isLoading: boolean

  onAuthorize: (
    onu: UnauthorizedOnu
  ) => void
}

export function UnregisteredOnuTable({
  onus,
  isLoading,
  onAuthorize,
}: Props) {

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Unauthorized ONU
        </CardTitle>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                ONU ID
              </TableHead>

              <TableHead>
                EPON Port
              </TableHead>

              <TableHead>
                MAC Address
              </TableHead>

              <TableHead>
                ONU Name
              </TableHead>

              <TableHead>
                Comment
              </TableHead>

              <TableHead>
                Action
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {isLoading && (

              <TableRow>

                <TableCell
                  colSpan={6}
                  className="
                    text-center
                  "
                >
                  Loading...
                </TableCell>

              </TableRow>

            )}

            {!isLoading &&
              onus.length === 0 && (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    className="
                      text-center
                    "
                  >
                    No unauthorized ONU found
                  </TableCell>

                </TableRow>

              )}

            {onus.map(
              onu => (

                <TableRow
                  key={onu.id}
                >

                  <TableCell>
                    {onu.onuId}
                  </TableCell>

                  <TableCell>
                    {onu.eponPort}
                  </TableCell>

                  <TableCell>
                    {onu.macAddress}
                  </TableCell>

                  <TableCell>
                    {onu.onuName}
                  </TableCell>

                  <TableCell>
                    {onu.onuComtName}
                  </TableCell>

                  <TableCell>

                    <Button
                      size="sm"
                      onClick={() =>
                        onAuthorize(
                          onu,
                        )
                      }
                    >
                      Authorize
                    </Button>

                  </TableCell>

                </TableRow>

              ),
            )}

          </TableBody>

        </Table>

      </CardContent>

    </Card>
  )
}