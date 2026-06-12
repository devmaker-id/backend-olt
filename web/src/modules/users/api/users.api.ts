import { api }
  from '@/shared/lib/api'

import type {
  User,
  UpdateProfileDto,
  ChangePasswordDto,
} from '../types/user.types'

export async function
getCurrentUser() {

  const response =
    await api.get<User>(
      '/users/me',
    )

  return response.data
}

export async function
updateProfile(
  payload: UpdateProfileDto,
) {

  const response =
    await api.patch(
      '/users/me',
      payload,
    )

  return response.data
}

export async function
changePassword(
  payload: ChangePasswordDto,
) {

  const response =
    await api.patch(
      '/users/password',
      payload,
    )

  return response.data
}