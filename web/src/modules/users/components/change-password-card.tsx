import { useState } from 'react'

import {
  Eye,
  EyeOff,
} from 'lucide-react'

import { toast }
  from 'sonner'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
  useChangePassword,
} from '../hooks/use-change-password'

export function ChangePasswordCard() {

  const changeMutation =
    useChangePassword()

  const [
    oldPassword,
    setOldPassword,
  ] = useState('')

  const [
    newPassword,
    setNewPassword,
  ] = useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [
    showOldPassword,
    setShowOldPassword,
  ] = useState(false)

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (
      newPassword !==
      confirmPassword
    ) {

      toast.error(
        'Password confirmation does not match',
      )

      return
    }

    try {

      await changeMutation
        .mutateAsync({

          oldPassword,

          newPassword,

        })

      toast.success(
        'Password updated successfully',
      )

      setOldPassword('')

      setNewPassword('')

      setConfirmPassword('')

    }

    catch (
      error: any
    ) {

      toast.error(
        error?.response?.data?.message ??
        'Failed to update password',
      )

    }

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Change Password
        </CardTitle>

      </CardHeader>

      <CardContent>

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
              Current Password
            </Label>

            <div
              className="
                relative
              "
            >

              <Input
                type={
                  showOldPassword
                    ? 'text'
                    : 'password'
                }
                value={
                  oldPassword
                }
                onChange={event =>
                  setOldPassword(
                    event.target.value,
                  )
                }
                required
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-1
                  top-1/2
                  h-8
                  w-8
                  -translate-y-1/2
                "
                onClick={() =>
                  setShowOldPassword(
                    !showOldPassword,
                  )
                }
              >

                {
                  showOldPassword
                    ? (
                        <EyeOff
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                    : (
                        <Eye
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                }

              </Button>

            </div>

          </div>

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
                  showNewPassword
                    ? 'text'
                    : 'password'
                }
                value={
                  newPassword
                }
                onChange={event =>
                  setNewPassword(
                    event.target.value,
                  )
                }
                required
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-1
                  top-1/2
                  h-8
                  w-8
                  -translate-y-1/2
                "
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword,
                  )
                }
              >

                {
                  showNewPassword
                    ? (
                        <EyeOff
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                    : (
                        <Eye
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                }

              </Button>

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

            <div
              className="
                relative
              "
            >

              <Input
                type={
                  showConfirmPassword
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
                required
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-1
                  top-1/2
                  h-8
                  w-8
                  -translate-y-1/2
                "
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword,
                  )
                }
              >

                {
                  showConfirmPassword
                    ? (
                        <EyeOff
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                    : (
                        <Eye
                          className="
                            h-4
                            w-4
                          "
                        />
                      )
                }

              </Button>

            </div>

            {
              confirmPassword &&
              newPassword !==
                confirmPassword && (

                <p
                  className="
                    text-sm
                    text-destructive
                  "
                >
                  Password confirmation does not match.
                </p>

              )
            }

          </div>

          <Button
            type="submit"
            disabled={
              changeMutation.isPending
            }
          >

            {
              changeMutation.isPending
                ? 'Updating...'
                : 'Update Password'
            }

          </Button>

        </form>

      </CardContent>

    </Card>

  )

}