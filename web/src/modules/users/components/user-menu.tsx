import {
  Link,
  useNavigate,
} from 'react-router-dom'

import {
  LogOut,
  User,
  UserCircle,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { logout } from '@/shared/utils/auth'
import {
  Button,
} from '@/components/ui/button'

export function UserMenu() {
    const navigate = useNavigate()

    function handleLogout() {

    logout()

    navigate(
        '/login',
    )

    }

  const user =
    JSON.parse(
      localStorage.getItem(
        'user',
      ) ?? '{}',
    )

  return (

    <DropdownMenu>

      <DropdownMenuTrigger
        asChild
      >

        <Button
          variant="ghost"
          className="
            h-auto
            w-full
            justify-start
            p-2
          "
        >

          <UserCircle
            className="
              mr-3
              h-5
              w-5
              shrink-0
            "
          />

          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
              text-left
            "
          >

            <span
              className="
                truncate
                text-sm
                font-medium
              "
            >
              {user.username ??
                'Unknown User'}
            </span>

            <span
              className="
                text-xs
                text-muted-foreground
              "
            >
              {user.role ??
                '-'}
            </span>

          </div>

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >

        <DropdownMenuLabel>

          <div
            className="
              flex
              flex-col
            "
          >

            <span
              className="
                font-medium
              "
            >
              {user.username ??
                'Unknown User'}
            </span>

            <span
              className="
                text-xs
                text-muted-foreground
              "
            >
              {user.role ??
                '-'}
            </span>

          </div>

        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
        >

          <Link
            to="/profile"
            className="
              flex
              items-center
              gap-2
            "
          >

            <User
              className="
                h-4
                w-4
              "
            />

            Profile

          </Link>

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
        onClick={handleLogout}
        >

        <LogOut
            className="
            h-4
            w-4
            "
        />

        Logout

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>

  )

}