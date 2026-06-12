import { useState } from 'react'

import {
  Navigate,
  useNavigate,
} from 'react-router-dom'

import {
  Network,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
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
  useLogin,
} from '../../../hooks/use-login'

import {
  login,
  hasToken,
} from '../../../shared/utils/auth'

export function LoginPage() {

  if (hasToken()) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  const navigate =
    useNavigate()

  const loginMutation =
    useLogin()

  const [
    username,
    setUsername,
  ] = useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  async function handleSubmit(
    event: React.FormEvent,
  ) {

    event.preventDefault()

    try {

      const result =
        await loginMutation
          .mutateAsync({

            username,
            password,

          })

      login(
        result.token,
        result.user,
      )

      navigate(
        '/dashboard',
      )

    }

    catch {

      alert(
        'Login gagal',
      )

    }

  }

  return (

    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-muted/30
        p-4
      "
    >

      <Card
        className="
          w-full
          max-w-md
        "
      >

        <CardHeader
          className="
            text-center
          "
        >

          <div
            className="
              mx-auto
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
            "
          >

            <Network
              className="
                h-6
                w-6
              "
            />

          </div>

          <CardTitle>
            Backend OLT
          </CardTitle>

          <CardDescription>

            Network Management System

          </CardDescription>

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
                value={
                  username
                }
                onChange={(
                  event,
                ) =>
                  setUsername(
                    event.target.value,
                  )
                }
                placeholder="Enter username"
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
                onChange={(
                  event,
                ) =>
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder="Enter password"
                required
              />

            </div>

            <Button
              type="submit"
              className="
                w-full
              "
              disabled={
                loginMutation.isPending
              }
            >

              {
                loginMutation.isPending
                  ? 'Signing In...'
                  : 'Login'
              }

            </Button>

          </form>

        </CardContent>

      </Card>

    </div>

  )

}