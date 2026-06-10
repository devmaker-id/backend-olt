import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Button,
} from '@/components/ui/button'

import {
  Input,
} from '@/components/ui/input'

import {
  Label,
} from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  useCreateTelegramUser,
} from '../hooks/use-create-telegram-user'

import type {
  TelegramRole,
} from '../types/telegram.types'

interface Props {
  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function CreateTelegramUserDialog({
  open,
  onOpenChange,
}: Props) {

  const createMutation =
    useCreateTelegramUser()

  const [
    telegramId,
    setTelegramId,
  ] = useState('')

  const [
    username,
    setUsername,
  ] = useState('')

  const [
    fullName,
    setFullName,
  ] = useState('')

  const [
    role,
    setRole,
  ] = useState<TelegramRole>(
    'TEKNISI',
  )

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    await createMutation.mutateAsync({
      telegramId,
      username,
      fullName,
      role,
    })

    setTelegramId('')
    setUsername('')
    setFullName('')
    setRole('TEKNISI')

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Add Telegram User
          </DialogTitle>

          <DialogDescription>
            Register a telegram
            user for bot access.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <div className="space-y-2">

            <Label>
              Telegram ID
            </Label>

            <Input
              value={telegramId}
              onChange={(event) =>
                setTelegramId(
                  event.target.value,
                )
              }
              placeholder="123456789"
            />

          </div>

          <div className="space-y-2">

            <Label>
              Username
            </Label>

            <Input
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value,
                )
              }
              placeholder="telegram_username"
            />

          </div>

          <div className="space-y-2">

            <Label>
              Full Name
            </Label>

            <Input
              value={fullName}
              onChange={(event) =>
                setFullName(
                  event.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Role
            </Label>

            <Select
              value={role}
              onValueChange={(
                value,
              ) =>
                setRole(
                  value as TelegramRole,
                )
              }
            >

              <SelectTrigger className="w-full">

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="ADMIN">
                  👑 ADMIN
                </SelectItem>

                <SelectItem value="TEKNISI">
                  🔧 TEKNISI
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <DialogFooter>

            <Button
              type="submit"
              disabled={
                createMutation.isPending
              }
            >
              {
                createMutation.isPending
                  ? 'Saving...'
                  : 'Add User'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  )
}