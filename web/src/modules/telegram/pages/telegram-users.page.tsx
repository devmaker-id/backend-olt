import { useState }
from 'react'

import {
  useTelegramUsers
} from '../hooks/use-telegram-users'

import {
  useCreateTelegramUser
} from '../hooks/use-create-telegram-user'

import {
  useDeleteTelegramUser
} from '../hooks/use-delete-telegram-user'
import type { TelegramRole } from '../types/telegram.types'

export function TelegramUsersPage() {

  const {
    data = [],
    isLoading
  } = useTelegramUsers()

  const createMutation =
    useCreateTelegramUser()

  const deleteMutation =
    useDeleteTelegramUser()

  const [
    telegramId,
    setTelegramId
  ] = useState('')

  const [
    username,
    setUsername
  ] = useState('')

  const [
    fullName,
    setFullName
  ] = useState('')

  const [
    role,
    setRole
  ] = useState<TelegramRole>('TEKNISI')

  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    await createMutation.mutateAsync({
      telegramId,
      username,
      fullName,
      role
    })

    setTelegramId('')
    setUsername('')
    setFullName('')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>

      <h1>
        Telegram Users
      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <input
          placeholder="Telegram ID"
          value={telegramId}
          onChange={event =>
            setTelegramId(
              event.target.value
            )
          }
        />

        <input
          placeholder="username"
          value={username}
          onChange={event =>
            setUsername(
              event.target.value
            )
          }
        />
        <input
          placeholder="fullname"
          value={fullName}
          onChange={event =>
            setFullName(
              event.target.value
            )
          }
        />

        <select
          value={role}
          onChange={event =>
            setRole(
              event.target.value as TelegramRole
            )
          }
        >
          <option value="TEKNISI">
            TEKNISI
          </option>

          <option value="ADMIN">
            ADMIN
          </option>
        </select>

        <button type="submit">
          Add User
        </button>

      </form>

      <hr />

      <table border={1}>

        <thead>

          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Telegram ID</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map(user => (

            <tr key={user.id}>

              <td>
                {user.username}
              </td>

              <td>
                {user.fullName}
              </td>

              <td>
                {user.telegramId}
              </td>

              <td>
                {
                  user.role === 'ADMIN' ? '👑 ADMIN' : '🔧 TEKNISI'
                }
              </td>

              <td>
                {String(
                  user.isActive
                )}
              </td>

              <td>

                <button
                  onClick={() =>
                    deleteMutation.mutate(
                      user.id
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}