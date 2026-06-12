import {
  useMemo,
  useState,
} from 'react'

import {
  Plus,
} from 'lucide-react'

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
  LoadingState,
} from '@/shared/components/loading-state'

import {
  ErrorState,
} from '@/shared/components/error-state'

import {
  EmptyState,
} from '@/shared/components/empty-state'

import {
  ConfirmDelete,
} from '@/shared/components/confirm-delete'

import {
  useUsers,
} from '../hooks/use-users'

import {
  useDeleteUser,
} from '../hooks/use-delete-user'

import {
  UserSummary,
} from '../components/user-summary'

import {
  UserToolbar,
} from '../components/user-toolbar'

import {
  UserTable,
} from '../components/user-table'

import {
  CreateUserDialog,
} from '../components/create-user-dialog'

import {
  EditUserDialog,
} from '../components/edit-user-dialog'

import {
  UserDetailSheet,
} from '../components/user-detail-sheet'

import type {
  User,
} from '../types/user-management.types'
import { ResetPasswordDialog } from '../components/reset-password-dialog'

export function UserListPage() {

  const {
    data,
    isLoading,
    error,
  } = useUsers()

  const deleteMutation =
    useDeleteUser()

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    createOpen,
    setCreateOpen,
  ] = useState(false)

  const [
    editOpen,
    setEditOpen,
  ] = useState(false)

  const [
    detailOpen,
    setDetailOpen,
  ] = useState(false)

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false)

  const [
    resetPasswordOpen,
    setResetPasswordOpen,
  ] = useState(false)

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<User | null>(
    null,
  )

  const filteredUsers =
    useMemo(() => {

      if (!data) {
        return []
      }

      const keyword =
        search.toLowerCase()

      return data.filter(
        user =>
          user.username
            .toLowerCase()
            .includes(
              keyword,
            ) ||

          user.role
            .toLowerCase()
            .includes(
              keyword,
            ),
      )

    }, [
      data,
      search,
    ])

  async function
  handleDelete() {

    if (!selectedUser) {
      return
    }

    await deleteMutation
      .mutateAsync(
        selectedUser.id,
      )

    setDeleteOpen(
      false,
    )

    setSelectedUser(
      null,
    )

  }

  if (isLoading) {

    return (
      <LoadingState />
    )

  }

  if (error) {

    return (
      <ErrorState
        message="Failed to load users."
      />
    )

  }

  if (
    !data ||
    data.length === 0
  ) {

    return (
      <EmptyState
        title="No Users"
        description="No users found."
      />
    )

  }

  return (

    <PageContainer>

      <PageHeader
        title="Users"
        description="
          Manage system users.
        "
      />

      <UserSummary
        total={
          filteredUsers.length
        }
      />

      <div
        className="
          mt-6
          space-y-4
        "
      >

        <UserToolbar
          search={search}
          onSearchChange={
            setSearch
          }
        />

        <div
          className="
            flex
            justify-end
          "
        >

          <Button
            onClick={() =>
              setCreateOpen(
                true,
              )
            }
          >

            <Plus />

            Create User

          </Button>

        </div>

      </div>

      <div
        className="mt-6"
      >

        <UserTable

          users={
            filteredUsers
          }

          onView={user => {

            setSelectedUser(
              user,
            )

            setDetailOpen(
              true,
            )

          }}

          onEdit={user => {

            setSelectedUser(
              user,
            )

            setEditOpen(
              true,
            )

          }}

          onDelete={user => {

            setSelectedUser(
              user,
            )

            setDeleteOpen(
              true,
            )

          }}

          onResetPassword={user => {

            setSelectedUser(
              user,
            )

            setResetPasswordOpen(
              true,
            )

          }}

        />

      </div>

      <CreateUserDialog
        open={createOpen}
        onOpenChange={
          setCreateOpen
        }
      />

      <EditUserDialog
        user={selectedUser}
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
      />

      <UserDetailSheet

        user={selectedUser}

        open={detailOpen}

        onOpenChange={
          setDetailOpen
        }

        onEdit={() => {

          setDetailOpen(
            false,
          )

          setEditOpen(
            true,
          )

        }}

        onResetPassword={() => {

          setDetailOpen(
            false,
          )

          setResetPasswordOpen(
            true,
          )

        }}

      />

      <ConfirmDelete
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
        title="Delete User"
        description={`Delete user "${selectedUser?.username}"?`}
        onConfirm={
          handleDelete
        }
        isLoading={
          deleteMutation.isPending
        }
      />

      <ResetPasswordDialog

        user={selectedUser}

        open={
          resetPasswordOpen
        }

        onOpenChange={
          setResetPasswordOpen
        }

      />

    </PageContainer>

  )

}