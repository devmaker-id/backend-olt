import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../modules/auth/components/protected-route'

import { ErrorPage } from '../shared/pages/error.page'
import { NotFoundPage } from '../shared/pages/not-found.page'
import { LoginPage } from '../modules/auth/pages/login.page'
import { RootPage } from '../modules/auth/pages/root.page'
import { DashboardPage } from '../modules/dashboard/pages/dashboard.page'
import { EndpointListPage } from '../modules/endpoint/pages/endpoint-list.page'
import { DashboardLayout } from '../shared/layouts/dashboard.layout'
import { UnregisteredOnuPage } from '../modules/onu/pages/unregistered-onu.page'
import { EndpointDetailPage } from '../modules/endpoint/pages/endpoint-detail.page'
import { TelegramUsersPage } from '../modules/telegram/pages/telegram-users.page'

export const router =
  createBrowserRouter([
    {
      path: '*',
      element: (
        <ProtectedRoute>
          <NotFoundPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/',
      element: <RootPage />,
      errorElement: <ErrorPage />
    },
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
    },
    {
      path: '/endpoints',
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <EndpointListPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path:
        '/endpoints/:id',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <EndpointDetailPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path:
        '/onu/unregistered',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <UnregisteredOnuPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path:
        '/telegram/users',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <TelegramUsersPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    }
  ])