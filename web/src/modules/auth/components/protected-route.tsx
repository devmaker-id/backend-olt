import type {
  ReactNode
} from 'react'

import {
  Navigate
} from 'react-router-dom'

import {
  isAuthenticated
} from '../../../shared/utils/auth'

interface Props {
  children: ReactNode
}

export function ProtectedRoute(
  props: Props
) {

  if (
    !isAuthenticated()
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return props.children
}