import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type {
  OnuReplacement,
} from '../types/onu-replacement.types'

interface Props {
  replacement:
    OnuReplacement | null

  open: boolean

  onOpenChange: (
    open: boolean
  ) => void
}

export function OnuReplacementDetailSheet({
  replacement,
  open,
  onOpenChange,
}: Props) {

  if (!replacement) {
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
          p-2
        "
      >

        <SheetHeader>

          <SheetTitle>
            ONU Replacement Detail
          </SheetTitle>

          <SheetDescription>

            Replacement history for

            {' '}

            {
              replacement
                .endpoint
                .internetNo
            }

          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-0
            space-y-4
            px-2
          "
        >

          {/* Endpoint */}

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
              Endpoint
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  Internet No:
                </span>

                {' '}

                {
                  replacement
                    .endpoint
                    .internetNo
                }

              </div>

              <div>

                <span className="font-medium">
                  Name:
                </span>

                {' '}

                {
                  replacement
                    .endpoint
                    .name
                }

              </div>

              <div>

                <span className="font-medium">
                  Address:
                </span>

                {' '}

                {
                  replacement
                    .endpoint
                    .address ||
                    '-'
                }

              </div>

            </div>

          </section>

          {/* Old ONU */}

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
              Old ONU
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  ONU ID:
                </span>

                {' '}

                {
                  replacement
                    .oldOnu
                    .onuId
                }

              </div>

              <div>

                <span className="font-medium">
                  MAC:
                </span>

                {' '}

                {
                  replacement
                    .oldOnu
                    .onuMac
                }

              </div>

              <div>

                <span className="font-medium">
                  Name:
                </span>

                {' '}

                {
                  replacement
                    .oldOnu
                    .onuName
                }

              </div>

              <div>

                <span className="font-medium">
                  Model:
                </span>

                {' '}

                {
                  replacement
                    .oldOnu
                    .model
                }

              </div>

            </div>

          </section>

          {/* New ONU */}

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
              New ONU
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  ONU ID:
                </span>

                {' '}

                {
                  replacement
                    .newOnu
                    .onuId
                }

              </div>

              <div>

                <span className="font-medium">
                  MAC:
                </span>

                {' '}

                {
                  replacement
                    .newOnu
                    .onuMac
                }

              </div>

              <div>

                <span className="font-medium">
                  Name:
                </span>

                {' '}

                {
                  replacement
                    .newOnu
                    .onuName
                }

              </div>

              <div>

                <span className="font-medium">
                  Model:
                </span>

                {' '}

                {
                  replacement
                    .newOnu
                    .model
                }

              </div>

            </div>

          </section>

          {/* Metadata */}

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
              Replacement Info
            </h3>

            <div
              className="
                space-y-2
                text-sm
              "
            >

              <div>

                <span className="font-medium">
                  Reason:
                </span>

                {' '}

                {
                  replacement
                    .reason ||
                    '-'
                }

              </div>

              <div>

                <span className="font-medium">
                  Replaced By:
                </span>

                {' '}

                {
                  replacement
                    .replacedBy ||
                    '-'
                }

              </div>

              <div>

                <span className="font-medium">
                  Date:
                </span>

                {' '}

                {
                  new Date(
                    replacement.createdAt,
                  ).toLocaleString()
                }

              </div>

            </div>

          </section>

        </div>

      </SheetContent>

    </Sheet>
  )
}