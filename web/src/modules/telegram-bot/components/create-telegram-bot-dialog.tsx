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
  useCreateTelegramBot,
} from '../hooks/use-create-telegram-bot'

interface Props {
  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function CreateTelegramBotDialog({
  open,
  onOpenChange,
}: Props) {

  const createMutation =
    useCreateTelegramBot()

  const [
    name,
    setName,
  ] = useState('')

  const [
    token,
    setToken,
  ] = useState('')

  const [
    defaultChatId,
    setDefaultChatId,
  ] = useState('')

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    await createMutation.mutateAsync({
      name,
      token,
      defaultChatId,
    })

    setName('')
    setToken('')
    setDefaultChatId('')

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
            Add Telegram Bot
          </DialogTitle>

          <DialogDescription>
            Register telegram bot.
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
              Bot Token
            </Label>

            <Input
              value={token}
              onChange={(event) =>
                setToken(
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
                  : 'Create Bot'
              }
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  )
}