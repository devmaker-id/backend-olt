import { useState } from 'react'

import {
  Eye,
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
  useDeleteTelegramBot,
} from '../hooks/use-delete-telegram-bot'

import {
  TelegramBotStatusBadge,
} from './telegram-bot-status-badge'

import type {
  TelegramBot,
} from '../types/telegram-bot.types'

interface Props {
  bots: TelegramBot[]

  isLoading: boolean

  onEdit: (
    bot: TelegramBot
  ) => void

  onView: (
    bot: TelegramBot
  ) => void
}

export function TelegramBotTable({
  bots,
  isLoading,
  onEdit,
  onView,
}: Props) {

  const deleteMutation =
    useDeleteTelegramBot()

  const [
    selectedBot,
    setSelectedBot,
  ] = useState<TelegramBot | null>(
    null,
  )

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false)

  async function handleDelete() {

    if (!selectedBot) {
      return
    }

    await deleteMutation.mutateAsync(
      selectedBot.id,
    )

    setDeleteOpen(false)

    setSelectedBot(null)
  }

  return (
    <>
      <Card>

        <CardHeader>

          <CardTitle>
            Telegram Bots
          </CardTitle>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>

              <TableRow>

                <TableHead>
                  Name
                </TableHead>

                <TableHead>
                  Username
                </TableHead>

                <TableHead>
                  Bot ID
                </TableHead>

                <TableHead>
                  Chat ID
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Webhook
                </TableHead>

                <TableHead />
              </TableRow>

            </TableHeader>

            <TableBody>

              {isLoading && (

                <TableRow>

                  <TableCell
                    colSpan={7}
                    className="text-center"
                  >
                    Loading...
                  </TableCell>

                </TableRow>

              )}

              {!isLoading &&
                bots.length === 0 && (

                  <TableRow>

                    <TableCell
                      colSpan={7}
                      className="text-center"
                    >
                      No telegram bots found
                    </TableCell>

                  </TableRow>

                )}

              {bots.map(bot => (

                <TableRow
                  key={bot.id}
                >

                  <TableCell>
                    {bot.name}
                  </TableCell>

                  <TableCell>
                    @{bot.username}
                  </TableCell>

                  <TableCell>
                    {bot.telegramBotId}
                  </TableCell>

                  <TableCell>
                    {
                      bot.defaultChatId ??
                      '-'
                    }
                  </TableCell>

                  <TableCell>

                    <TelegramBotStatusBadge
                      isActive={
                        bot.isActive
                      }
                    />

                  </TableCell>

                  <TableCell>

                    {bot.webhookUrl
                      ? 'Configured'
                      : 'Not Configured'}

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
                            onView(bot)
                          }
                        >

                          <Eye />

                          Detail

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            onEdit(bot)
                          }
                        >

                          <Pencil />

                          Edit

                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => {

                            setSelectedBot(
                              bot,
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
        title="Delete Telegram Bot"
        description={`Delete bot ${selectedBot?.name ?? ''}?`}
      />

    </>
  )
}