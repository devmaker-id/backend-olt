import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type { TelegramAccessLog } from '../types/telegram-access-log.types'

interface AccessLogDetailSheetProps {
  log: TelegramAccessLog | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccessLogDetailSheet({
  log,
  open,
  onOpenChange,
}: AccessLogDetailSheetProps) {
  if (!log) {
    return null
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-[700px] sm:max-w-[700px]">
        <SheetHeader>
          <SheetTitle>
            Access Log Detail
          </SheetTitle>

          <SheetDescription>
            Telegram activity detail
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div>
            <p className="font-semibold">
              Username
            </p>
            <p>{log.username}</p>
          </div>

          <div>
            <p className="font-semibold">
              Telegram ID
            </p>
            <p>{log.telegramId}</p>
          </div>

          <div>
            <p className="font-semibold">
              Message
            </p>
            <p>{log.message}</p>
          </div>

          <div>
            <p className="font-semibold">
              Bot
            </p>
            <p>{log.bot.name}</p>
          </div>

          <div>
            <p className="font-semibold">
              Raw Update
            </p>

            <pre className="overflow-auto rounded-md border bg-muted p-4 text-xs">
              {JSON.stringify(
                log.rawUpdate,
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}