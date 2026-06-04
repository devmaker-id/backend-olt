import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../modules/auth/components/protected-route'

import { LoginPage } from '../modules/auth/pages/login.page'
import { RootPage } from '../modules/auth/pages/root.page'
import { DashboardPage } from '../modules/dashboard/pages/dashboard.page'

export const router =
  createBrowserRouter([
    {
      path: '/',
      element: <RootPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      )
    }
  ])