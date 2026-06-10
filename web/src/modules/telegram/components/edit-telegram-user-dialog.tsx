import { useEffect } from 'react'
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
  useUpdateTelegramUser,
} from '../hooks/use-update-telegram-user'

import type {
  TelegramRole,
  TelegramUser,
} from '../types/telegram.types'

interface Props {
  user: TelegramUser | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function EditTelegramUserDialog({
  user,
  open,
  onOpenChange,
}: Props) {

  const updateMutation =
    useUpdateTelegramUser()

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

  const [
    isActive,
    setIsActive,
  ] = useState(true)

  useEffect(() => {

    if (!user) {
      return
    }

    setTelegramId(
      user.telegramId,
    )

    setUsername(
      user.username,
    )

    setFullName(
      user.fullName,
    )

    setRole(
      user.role,
    )

    setIsActive(
      user.isActive,
    )

  }, [user])

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (!user) {
      return
    }

    await updateMutation.mutateAsync({
      id: user.id,

      payload: {
        telegramId,
        username,
        fullName,
        role,
        isActive,
      },
    })

    onOpenChange(false)
  }

  if (!user) {
    return null
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
            Edit Telegram User
          </DialogTitle>

          <DialogDescription>
            Update telegram user
            information.
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

          <div className="space-y-2">

            <Label>
              Status
            </Label>

            <Select
              value={
                isActive
                  ? 'ACTIVE'
                  : 'INACTIVE'
              }
              onValueChange={(
                value,
              ) =>
                setIsActive(
                  value ===
                    'ACTIVE',
                )
              }
            >

              <SelectTrigger className="w-full">

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="ACTIVE">
                  Active
                </SelectItem>

                <SelectItem value="INACTIVE">
                  Inactive
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <DialogFooter>

            <Button
              type="submit"
              disabled={
                updateMutation.isPending
              }
            >
              {
                updateMutation.isPending
                  ? 'Saving...'
                  : 'Save Changes'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  )
}