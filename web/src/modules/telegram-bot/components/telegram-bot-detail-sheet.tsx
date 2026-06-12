import { useState } from 'react'

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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  useDeleteWebhook,
} from '../hooks/use-delete-webhook'

import {
  useSetWebhook,
} from '../hooks/use-set-webhook'

import {
  useTestTelegramBot,
} from '../hooks/use-test-telegram-bot'

import {
  useWebhookInfo,
} from '../hooks/use-webhook-info'

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

export function TelegramBotDetailSheet({
  bot,
  open,
  onOpenChange,
}: Props) {

  const [
    webhookUrl,
    setWebhookUrl,
  ] = useState('')

  const testMutation =
    useTestTelegramBot()

  const webhookInfoMutation =
    useWebhookInfo()

  const setWebhookMutation =
    useSetWebhook()

  const deleteWebhookMutation =
    useDeleteWebhook()

  if (!bot) {
    return null
  }

  return (
    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <SheetContent
        className="
          p-3
          w-full
          sm:max-w-2xl
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>
            {bot.name}
          </SheetTitle>

          <SheetDescription>
            Telegram bot details
          </SheetDescription>

        </SheetHeader>

        <div className="mt-6 space-y-4">

          <Card>

            <CardHeader>

              <CardTitle>
                Information
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-2">

              <p>
                Username:
                @{bot.username}
              </p>

              <p>
                Bot ID:
                {bot.telegramBotId}
              </p>

              <p>
                Chat ID:
                {
                  bot.defaultChatId ??
                  '-'
                }
              </p>

              <p>
                Status:
                {
                  bot.isActive
                    ? 'ACTIVE'
                    : 'INACTIVE'
                }
              </p>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Actions
              </CardTitle>

            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">

              <Button
                disabled={
                  !bot.defaultChatId
                }
                onClick={() =>
                  testMutation.mutate({
                    id: bot.id,
                    chatId:
                      bot.defaultChatId!,
                  })
                }
              >
                Test Message
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  webhookInfoMutation.mutate(
                    bot.id,
                  )
                }
              >
                Get Webhook Info
              </Button>

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Webhook
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">

                <Label>
                  Webhook URL
                </Label>

                <Input
                  value={
                    webhookUrl
                  }
                  onChange={(
                    event,
                  ) =>
                    setWebhookUrl(
                      event.target.value,
                    )
                  }
                />

              </div>

              <div className="flex gap-2">

                <Button
                  onClick={() =>
                    setWebhookMutation.mutate({
                      id: bot.id,
                      url: webhookUrl,
                    })
                  }
                >
                  Set Webhook
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteWebhookMutation.mutate(
                      bot.id,
                    )
                  }
                >
                  Delete Webhook
                </Button>

              </div>

            </CardContent>

          </Card>

          {webhookInfoMutation.data && (

            <Card>

              <CardHeader>

                <CardTitle>
                  Webhook Info
                </CardTitle>

              </CardHeader>

              <CardContent>

                <pre className="overflow-auto text-xs">
                  {
                    JSON.stringify(
                      webhookInfoMutation.data,
                      null,
                      2,
                    )
                  }
                </pre>

              </CardContent>

            </Card>

          )}

        </div>

      </SheetContent>

    </Sheet>
  )
}