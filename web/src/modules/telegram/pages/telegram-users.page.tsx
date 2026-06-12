import { useMemo } from 'react'
import { useState } from 'react'

import {
  Button,
} from '@/components/ui/button'

import {
  PageContainer,
} from '@/shared/components/page-container'

import {
  PageHeader,
} from '@/shared/components/page-header'

import {
  CreateTelegramUserDialog,
} from '../components/create-telegram-user-dialog'

import {
  EditTelegramUserDialog,
} from '../components/edit-telegram-user-dialog'

import {
  TelegramUserTable,
} from '../components/telegram-user-table'

import {
  TelegramUserToolbar,
} from '../components/telegram-user-toolbar'

import {
  useTelegramUsers,
} from '../hooks/use-telegram-users'

import type {
  TelegramUser,
} from '../types/telegram.types'

export function TelegramUsersPage() {

  const {
    data = [],
    isLoading,
  } = useTelegramUsers()

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    createOpen,
    setCreateOpen,
  ] = useState(false)

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<TelegramUser | null>(
    null,
  )

  const filteredUsers =
    useMemo(() => {

      const keyword =
        search.toLowerCase()

      return data.filter(
        user =>
          user.username
            ?.toLowerCase()
            .includes(keyword) ||
          user.fullName
            .toLowerCase()
            .includes(keyword) ||
          user.telegramId
            .toLowerCase()
            .includes(keyword),
      )

    }, [
      data,
      search,
    ])

  return (
    <PageContainer>

      <PageHeader
        title="Telegram Users"
        description="Manage telegram bot access users"
        actions={

          <Button
            onClick={() =>
              setCreateOpen(true)
            }
          >
            Add User
          </Button>

        }
      />

      <TelegramUserToolbar
        search={search}
        onSearchChange={
          setSearch
        }
      />

      <TelegramUserTable
        users={filteredUsers}
        isLoading={isLoading}
        onEdit={
          setSelectedUser
        }
      />

      <CreateTelegramUserDialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      />

      <EditTelegramUserDialog
        user={selectedUser}
        open={
          Boolean(
            selectedUser,
          )
        }
        onOpenChange={(
          open,
        ) => {

          if (!open) {
            setSelectedUser(
              null,
            )
          }

        }}
      />

    </PageContainer>
  )
}