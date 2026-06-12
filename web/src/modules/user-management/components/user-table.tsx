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
  User,
} from '../types/user-management.types'

import {
  UserActions,
} from './user-actions'
import { UserRoleBadge } from './user-role-badge'

interface Props {

  users: User[]

  onView: (
    user: User,
  ) => void

  onEdit: (
    user: User,
  ) => void

  onDelete: (
    user: User,
  ) => void

  onResetPassword: (
    user: User,
  ) => void

}

export function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
  onResetPassword,
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Users
        </CardTitle>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>
                Username
              </TableHead>

              <TableHead>
                Role
              </TableHead>

              <TableHead>
                Created At
              </TableHead>

              <TableHead>
                Action
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {users.length === 0 && (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="
                    text-center
                  "
                >

                  No users found

                </TableCell>

              </TableRow>

            )}

            {users.map(
              user => (

                <TableRow
                  key={user.id}
                >

                  <TableCell>
                    {user.username}
                  </TableCell>

                  <TableCell>
                    <UserRoleBadge
                        role={user.role}
                    />
                  </TableCell>

                  <TableCell>

                    {new Date(
                      user.createdAt,
                    ).toLocaleString()}

                  </TableCell>

                  <TableCell>

                    <UserActions

                      onView={() =>
                        onView(
                          user,
                        )
                      }

                      onEdit={() =>
                        onEdit(
                          user,
                        )
                      }

                      onDelete={() =>
                        onDelete(
                          user,
                        )
                      }

                      onResetPassword={() => 
                        onResetPassword(user)
                      }

                    />

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