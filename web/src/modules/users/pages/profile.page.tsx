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
  useCurrentUser,
} from '../hooks/use-current-user'

import {
  ProfileCard,
} from '../components/profile-card'

import {
  ProfileForm,
} from '../components/profile-form'

import {
  ChangePasswordCard,
} from '../components/change-password-card'

export function ProfilePage() {

  const {
    data,
    isLoading,
    error,
  } = useCurrentUser()

  if (isLoading) {
    return (
      <LoadingState />
    )
  }

  if (error || !data) {
    return (
      <ErrorState
        message="Failed to load profile."
      />
    )
  }

  return (

    <PageContainer>

      <PageHeader
        title="Profile"
        description="Manage your account."
      />

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >

        <ProfileCard
          user={data}
        />

        <ProfileForm
          user={data}
        />

      </div>

      <div
        className="
          mt-6
        "
      >

        <ChangePasswordCard />

      </div>

    </PageContainer>

  )

}