import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type {
  User,
} from '../types/user.types'

interface ProfileCardProps {
  user: User
}

export function ProfileCard({
  user,
}: ProfileCardProps) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          User Information
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
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

      </CardContent>

    </Card>

  )

}