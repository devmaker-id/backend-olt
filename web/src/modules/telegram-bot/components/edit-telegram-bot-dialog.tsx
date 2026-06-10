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
  useUpdateTelegramBot,
} from '../hooks/use-update-telegram-bot'

import type {
  TelegramBot,
} from '../types/telegram-bot.types'

interface Props {
  bot: TelegramBot | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function EditTelegramBotDialog({
  bot,
  open,
  onOpenChange,
}: Props) {

  const updateMutation =
    useUpdateTelegramBot()

  const [
    name,
    setName,
  ] = useState('')

  const [
    defaultChatId,
    setDefaultChatId,
  ] = useState('')

  const [
    description,
    setDescription,
  ] = useState('')

  const [
    isActive,
    setIsActive,
  ] = useState(true)

  useEffect(() => {

    if (!bot) {
      return
    }

    setName(
      bot.name,
    )

    setDefaultChatId(
      bot.defaultChatId ?? '',
    )

    setDescription(
      bot.description ?? '',
    )

    setIsActive(
      bot.isActive,
    )

  }, [bot])

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (!bot) {
      return
    }

    await updateMutation.mutateAsync({

      id: bot.id,

      data: {
        name,
        defaultChatId,
        description,
        isActive,
      },

    })

    onOpenChange(false)
  }

  if (!bot) {
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
            Edit Telegram Bot
          </DialogTitle>

          <DialogDescription>
            Update bot information.
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
              Bot Name
            </Label>

            <Input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Default Chat ID
            </Label>

            <Input
              value={defaultChatId}
              onChange={(event) =>
                setDefaultChatId(
                  event.target.value,
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Description
            </Label>

            <Input
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
            />

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