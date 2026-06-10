import { Navigate } from 'react-router-dom'
import { hasToken } from '../../../shared/utils/auth'

export function RootPage() {

  if (hasToken()) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  )
}