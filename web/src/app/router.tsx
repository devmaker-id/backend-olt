import { LoadingState } from '@/shared/components/loading-state'
import { Suspense } from 'react'
import {
  createBrowserRouter
} from 'react-router-dom'

import {
  ProtectedRoute
} from '@/modules/auth/components/protected-route'

import {
  DashboardLayout
} from '@/shared/layouts/dashboard.layout'

import {
  LoginPage
} from '@/modules/auth/pages/login.page'

import {
  RootPage
} from '@/modules/auth/pages/root.page'

import {
  ErrorPage
} from '@/shared/pages/error.page'

import {
  NotFoundPage
} from '@/shared/pages/not-found.page'

import { dashboardRoutes } from '@/modules/dashboard/routes'
import {
  endpointRoutes
} from '@/modules/endpoint/routes'

import {
  oltRoutes
} from '@/modules/olt/routes'

import {
  telegramRoutes
} from '@/modules/telegram/routes'

import {
  telegramBotRoutes
} from '@/modules/telegram-bot/routes'

import {
  onuRoutes
} from '@/modules/onu/routes'

import {
  onuReplacementRoutes
} from '@/modules/onu-replacement/routes'

import {
  systemLogsRoutes
} from '@/modules/system-logs/routes'

import {
  usersRoutes,
} from '@/modules/users/routes'
import { userManagementRoutes } from '@/modules/user-management/routes'

export const router = createBrowserRouter([

    {
      path: '/',
      element: <RootPage />,
      errorElement: <ErrorPage />
    },

    {
      path: '/login',
      element: <LoginPage />
    },

    {
      path: '/',

      element: (

        <ProtectedRoute>
          <Suspense
            fallback={
              <LoadingState />
            }
          >
            <DashboardLayout />
          </Suspense>
        </ProtectedRoute>

      ),

      children: [
        ...dashboardRoutes,
        ...oltRoutes,
        ...endpointRoutes,
        ...telegramRoutes,
        ...telegramBotRoutes,
        ...onuRoutes,
        ...onuReplacementRoutes,
        ...systemLogsRoutes,
        ...usersRoutes,
        ...userManagementRoutes,
      ]
    },

    {
      path: '*',
      element: <NotFoundPage />
    }
  ])