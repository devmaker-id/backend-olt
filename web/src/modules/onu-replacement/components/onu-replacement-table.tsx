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
  OnuReplacement,
} from '../types/onu-replacement.types'

interface Props {
  replacements: OnuReplacement[]

  isLoading: boolean

  onView: (
    replacement: OnuReplacement
  ) => void
}

export function OnuReplacementTable({
  replacements,
  isLoading,
  onView,
}: Props) {

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          ONU Replacement History
        </CardTitle>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Date
              </TableHead>

              <TableHead>
                Internet No
              </TableHead>

              <TableHead>
                Customer
              </TableHead>

              <TableHead>
                Old ONU
              </TableHead>

              <TableHead>
                New ONU
              </TableHead>

              <TableHead>
                Reason
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
                  colSpan={7}
                  className="
                    text-center
                  "
                >
                  Loading...
                </TableCell>

              </TableRow>

            )}

            {!isLoading &&
              replacements.length === 0 && (

                <TableRow>

                  <TableCell
                    colSpan={7}
                    className="
                      text-center
                    "
                  >
                    No replacement history found
                  </TableCell>

                </TableRow>

              )}

            {replacements.map(
              replacement => (

                <TableRow
                  key={
                    replacement.id
                  }
                >

                  <TableCell>

                    {
                      new Date(
                        replacement.createdAt,
                      ).toLocaleString()
                    }

                  </TableCell>

                  <TableCell>

                    {
                      replacement.endpoint
                        .internetNo
                    }

                  </TableCell>

                  <TableCell>

                    {
                      replacement.endpoint
                        .name
                    }

                  </TableCell>

                  <TableCell>

                    {
                      replacement.oldOnu
                        .onuMac
                    }

                  </TableCell>

                  <TableCell>

                    {
                      replacement.newOnu
                        .onuMac
                    }

                  </TableCell>

                  <TableCell>

                    {
                      replacement.reason ||
                      '-'
                    }

                  </TableCell>

                  <TableCell>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onView(
                          replacement,
                        )
                      }
                    >
                      View
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