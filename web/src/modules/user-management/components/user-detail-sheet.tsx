import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type {
  User,
} from '../types/user-management.types'

interface Props {

  user: User | null

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function UserDetailSheet({
  user,
  open,
  onOpenChange,
}: Props) {

  if (!user) {
    return null
  }

  return (

    <Sheet
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <SheetContent>

        <SheetHeader>

          <SheetTitle>
            User Detail
          </SheetTitle>

          <SheetDescription>
            User information.
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-6
            space-y-4
          "
        >

          <div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Username
            </p>

            <p>
              {user.username}
            </p>

          </div>

          <div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Role
            </p>

            <p>
              {user.role}
            </p>

          </div>

          <div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Created At
            </p>

            <p>
              {new Date(
                user.createdAt,
              ).toLocaleString()}
            </p>

          </div>

          <div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              Updated At
            </p>

            <p>
              {new Date(
                user.updatedAt,
              ).toLocaleString()}
            </p>

          </div>

        </div>

      </SheetContent>

    </Sheet>

  )

}