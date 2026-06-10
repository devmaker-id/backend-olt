import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type {
  TelegramBot,
} from '../types/telegram-bot.types'

interface Props {
  bots: TelegramBot[]
}

export function TelegramBotSummary({
  bots,
}: Props) {

  const totalBots =
    bots.length

  const activeBots =
    bots.filter(
      bot =>
        bot.isActive,
    ).length

  const webhookBots =
    bots.filter(
      bot =>
        Boolean(
          bot.webhookUrl,
        ),
    ).length

  return (
    <div className="grid gap-4 md:grid-cols-3">

      <Card>

        <CardHeader>

          <CardTitle>
            Total Bots
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="text-3xl font-bold">
            {totalBots}
          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Active Bots
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="text-3xl font-bold">
            {activeBots}
          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle>
            Webhook Configured
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="text-3xl font-bold">
            {webhookBots}
          </div>

        </CardContent>

      </Card>

    </div>
  )
}