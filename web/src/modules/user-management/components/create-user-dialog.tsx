import {
  useState,
} from 'react'

import {
  toast,
} from 'sonner'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  useCreateUser,
} from '../hooks/use-create-user'
import type { UserRole } from '../types/user-management.types'

interface Props {

  open: boolean

  onOpenChange: (
    open: boolean,
  ) => void

}

export function CreateUserDialog({
  open,
  onOpenChange,
}: Props) {

  const mutation =
    useCreateUser()

  const [
    username,
    setUsername,
  ] = useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    role,
    setRole,
  ] = useState<UserRole>(
    'TEKNISI',
  )

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    try {
      await mutation.mutateAsync({
          username,
          password,
          role,
        })

      toast.success(
        'User created',
      )

      onOpenChange(
        false,
      )

      setUsername('')
      setPassword('')
      setRole('TEKNISI')

    }

    catch (
      error: any
    ) {

      toast.error(

        error?.response
          ?.data?.message ??

        'Failed to create user',

      )

    }

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
            Create User
          </DialogTitle>

          <DialogDescription>
            Create a new user account.
          </DialogDescription>

        </DialogHeader>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-4
          "
        >

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Username
            </Label>

            <Input
              value={
                username
              }
              onChange={event =>
                setUsername(
                  event.target.value,
                )
              }
              required
            />

          </div>

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Password
            </Label>

            <Input
              type="password"
              value={
                password
              }
              onChange={event =>
                setPassword(
                  event.target.value,
                )
              }
              required
            />

          </div>

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Role
            </Label>

            <Select
              value={role}
              onValueChange={value =>
                setRole(
                    value as UserRole
                )
              }
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem
                  value="OWNER"
                >
                  OWNER
                </SelectItem>

                <SelectItem
                  value="TEKNISI"
                >
                  TEKNISI
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <DialogFooter>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(
                  false,
                )
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
            >
              Create User
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  )

}