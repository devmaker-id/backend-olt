import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type {
  TelegramAccessLog,
} from '../types/telegram-access-log.types'

interface AccessLogDetailSheetProps {

  log: TelegramAccessLog | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

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
      onOpenChange={
        onOpenChange
      }
    >

      <SheetContent
        className="
          w-full
          sm:max-w-xl
          overflow-y-auto
          p-3
        "
      >

        <SheetHeader>

          <SheetTitle>
            Access Log Detail
          </SheetTitle>

          <SheetDescription>
            Telegram activity detail
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-0
            space-y-4
            px-2
          "
        >

          <section
            className="
              rounded-lg
              border
              p-4
            "
          >

            <h3
              className="
                mb-3
                font-semibold
              "
            >
              User Information
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  Username:
                </span>

                {' '}

                {log.username}

              </div>

              <div>

                <span className="font-medium">
                  Telegram ID:
                </span>

                {' '}

                {log.telegramId}

              </div>

            </div>

          </section>

          <section
            className="
              rounded-lg
              border
              p-4
            "
          >

            <h3
              className="
                mb-3
                font-semibold
              "
            >
              Message Information
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  Message:
                </span>

                {' '}

                {log.message}

              </div>

              <div>

                <span className="font-medium">
                  Bot:
                </span>

                {' '}

                {log.bot.name}

              </div>

            </div>

          </section>

          <section
            className="
              rounded-lg
              border
              p-4
            "
          >

            <h3
              className="
                mb-3
                font-semibold
              "
            >
              Raw Update
            </h3>

            <pre
              className="
                overflow-auto
                rounded-md
                bg-muted
                p-4
                text-xs
              "
            >
              {
                JSON.stringify(
                  log.rawUpdate,
                  null,
                  2,
                )
              }
            </pre>

          </section>

        </div>

      </SheetContent>

    </Sheet>

  )

}