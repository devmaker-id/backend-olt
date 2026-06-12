import {
  Button,
} from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

  onEdit: () => void

  onResetPassword: () => void

}

export function UserDetailSheet({
  user,
  open,
  onOpenChange,
  onEdit,
  onResetPassword,
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

      <SheetContent
        className="
          p-3
          w-full
          overflow-y-auto
          sm:max-w-xl
        "
      >

        <SheetHeader>

          <SheetTitle>
            {user.username}
          </SheetTitle>

          <SheetDescription>
            User information and actions
          </SheetDescription>

        </SheetHeader>

        <div
          className="
            mt-6
            space-y-4
          "
        >

          <Card>

            <CardHeader>

              <CardTitle>
                Information
              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                space-y-3
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

            </CardContent>

          </Card>

          <Card>

            <CardHeader>

              <CardTitle>
                Actions
              </CardTitle>

            </CardHeader>

            <CardContent
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              <Button
                onClick={
                  onEdit
                }
              >
                Edit User
              </Button>

              <Button
                variant="secondary"
                onClick={
                  onResetPassword
                }
              >
                Reset Password
              </Button>

            </CardContent>

          </Card>

        </div>

      </SheetContent>

    </Sheet>

  )

}