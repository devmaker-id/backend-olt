import { useState } from 'react'

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ConfirmDelete,
} from '@/shared/components/confirm-delete'

import {
  useDeleteTelegramUser,
} from '../hooks/use-delete-telegram-user'

import {
  TelegramUserRoleBadge,
} from './telegram-user-role-badge'

import {
  TelegramUserStatusBadge,
} from './telegram-user-status-badge'

import type {
  TelegramUser,
} from '../types/telegram.types'

interface Props {
  users: TelegramUser[]

  isLoading: boolean

  onEdit: (
    user: TelegramUser
  ) => void
}

export function TelegramUserTable({
  users,
  isLoading,
  onEdit,
}: Props) {

  const deleteMutation =
    useDeleteTelegramUser()

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<TelegramUser | null>(
    null,
  )

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false)

  async function handleDelete() {

    if (!selectedUser) {
      return
    }

    await deleteMutation.mutateAsync(
      selectedUser.id,
    )

    setDeleteOpen(false)

    setSelectedUser(null)
  }

  return (
    <>
      <Card>

        <CardHeader>

          <CardTitle>
            Telegram Users
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
                  Full Name
                </TableHead>

                <TableHead>
                  Telegram ID
                </TableHead>

                <TableHead>
                  Role
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="w-20">
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {isLoading && (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    className="text-center"
                  >
                    Loading...
                  </TableCell>

                </TableRow>

              )}

              {!isLoading &&
                users.length === 0 && (

                  <TableRow>

                    <TableCell
                      colSpan={6}
                      className="text-center"
                    >
                      No telegram users found
                    </TableCell>

                  </TableRow>

                )}

              {users.map(user => (

                <TableRow
                  key={user.id}
                >

                  <TableCell>
                    @{user.username}
                  </TableCell>

                  <TableCell>
                    {user.fullName}
                  </TableCell>

                  <TableCell>
                    {user.telegramId}
                  </TableCell>

                  <TableCell>

                    <TelegramUserRoleBadge
                      role={user.role}
                    />

                  </TableCell>

                  <TableCell>

                    <TelegramUserStatusBadge
                      isActive={
                        user.isActive
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <DropdownMenu>

                      <DropdownMenuTrigger
                        asChild
                      >

                        <Button
                          variant="ghost"
                          size="icon-sm"
                        >

                          <MoreHorizontal />

                        </Button>

                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                      >

                        <DropdownMenuItem
                          onClick={() =>
                            onEdit(user)
                          }
                        >

                          <Pencil />

                          Edit

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => {

                            setSelectedUser(
                              user,
                            )

                            setDeleteOpen(
                              true,
                            )
                          }}
                        >

                          <Trash2 />

                          Delete

                        </DropdownMenuItem>

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        onConfirm={
          handleDelete
        }
        isLoading={
          deleteMutation.isPending
        }
        title="Delete Telegram User"
        description={`Delete user ${selectedUser?.username ?? ''}?`}
      />

    </>
  )
}