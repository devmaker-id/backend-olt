import { useEffect } from 'react'
import { useState } from 'react'

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
  useUpdateProfile,
} from '../hooks/use-update-profile'

import type {
  User,
} from '../types/user.types'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({
  user,
}: ProfileFormProps) {

  const updateMutation =
    useUpdateProfile()

  const [
    username,
    setUsername,
  ] = useState(
    user.username,
  )

  useEffect(() => {

    setUsername(
      user.username,
    )

  }, [user])

  const isChanged =
    username.trim() !==
    user.username

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    if (!isChanged) {

      toast.info(
        'No changes detected',
      )

      return

    }

    try {

      await updateMutation
        .mutateAsync({

          username:
            username.trim(),

        })

      toast.success(
        'Profile updated successfully',
      )

    }

    catch (
      error: any
    ) {

      toast.error(
        error?.response?.data?.message ??
        'Failed to update profile',
      )

    }

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Edit Profile
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
              Username
            </Label>

            <Input
              value={username}
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
              Role
            </Label>

            <Input
              value={
                user.role
              }
              disabled
            />

          </div>

          <Button
            type="submit"
            disabled={
              !isChanged ||
              updateMutation.isPending
            }
          >

            {
              updateMutation.isPending
                ? 'Saving...'
                : 'Save Changes'
            }

          </Button>

        </form>

      </CardContent>

    </Card>

  )

}