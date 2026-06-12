import {
  useState,
} from 'react'

import {
  Eye,
  EyeOff,
} from 'lucide-react'

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
  useResetUserPassword,
} from '../hooks/use-reset-user-password'

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

export function
ResetPasswordDialog({

  user,

  open,

  onOpenChange,

}: Props) {

  const mutation =
    useResetUserPassword()

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

  async function
  handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (
      password !==
      confirmPassword
    ) {

      toast.error(
        'Password confirmation does not match',
      )

      return

    }

    if (!user) {
      return
    }

    try {

      await mutation
        .mutateAsync({

          id: user.id,

          password,

        })

      toast.success(
        'Password reset successfully',
      )

      setPassword('')

      setConfirmPassword('')

      onOpenChange(
        false,
      )

    }

    catch {

      toast.error(
        'Failed to reset password',
      )

    }

  }

  if (!user) {
    return null
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
            Reset Password (<code>{user.username}</code>)
          </DialogTitle>

          <DialogDescription>
            Gunakan password baru setelah resset berhasil
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
              New Password
            </Label>

            <div
              className="
                relative
              "
            >

              <Input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={
                  password
                }
                onChange={event =>
                  setPassword(
                    event.target.value,
                  )
                }
              />

              <button
                type="button"
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                "
                onClick={() =>
                  setShowPassword(
                    !showPassword,
                  )
                }
              >

                {
                  showPassword
                    ? <EyeOff size={16} />
                    : <Eye size={16} />
                }

              </button>

            </div>

          </div>

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Confirm Password
            </Label>

            <Input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              value={
                confirmPassword
              }
              onChange={event =>
                setConfirmPassword(
                  event.target.value,
                )
              }
            />

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
              disabled={
                mutation.isPending
              }
            >
              Reset Password
            </Button>

          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>

  )

}