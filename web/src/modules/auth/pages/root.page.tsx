import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../../shared/utils/auth'

export function RootPage() {

  if (isAuthenticated) {
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