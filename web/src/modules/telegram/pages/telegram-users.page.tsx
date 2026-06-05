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
    name,
    setName
  ] = useState('')

  const [
    role,
    setRole
  ] = useState('USER')

  async function handleSubmit(
    event: React.FormEvent
  ) {

    event.preventDefault()

    await createMutation.mutateAsync({
      telegramId,
      name,
      role
    })

    setTelegramId('')
    setName('')
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
          placeholder="Name"
          value={name}
          onChange={event =>
            setName(
              event.target.value
            )
          }
        />

        <select
          value={role}
          onChange={event =>
            setRole(
              event.target.value
            )
          }
        >
          <option value="USER">
            USER
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

      <table>

        <thead>

          <tr>
            <th>Name</th>
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
                {user.name}
              </td>

              <td>
                {user.telegramId}
              </td>

              <td>
                {user.role}
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