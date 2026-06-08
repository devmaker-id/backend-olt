import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../modules/auth/components/protected-route'

import { ErrorPage } from '../shared/pages/error.page'
import { NotFoundPage } from '../shared/pages/not-found.page'
import { LoginPage } from '../modules/auth/pages/login.page'
import { RootPage } from '../modules/auth/pages/root.page'
import { DashboardPage } from '../modules/dashboard/pages/dashboard.page'

import { OltCreatePage } from '../modules/olt/pages/olt-create.page'
import { OltEditPage } from '../modules/olt/pages/olt-edit.page'
import { OltListPage } from '../modules/olt/pages/olt-list.page'
import { OltDetailPage } from '../modules/olt/pages/olt-detail.page'

import { EndpointListPage } from '../modules/endpoint/pages/endpoint-list.page'
import { DashboardLayout } from '../shared/layouts/dashboard.layout'
import { UnregisteredOnuPage } from '../modules/onu/pages/unregistered-onu.page'
import { EndpointDetailPage } from '../modules/endpoint/pages/endpoint-detail.page'
import { TelegramUsersPage } from '../modules/telegram/pages/telegram-users.page'

import { TelegramBotDetailPage } from '../modules/telegram-bot/pages/telegram-bot-detail.page'
import { TelegramBotListPage } from '../modules/telegram-bot/pages/telegram-bot-list.page'
import { TelegramBotCreatePage } from '../modules/telegram-bot/pages/telegram-bot-create.page'

import { OnuReplacementListPage } from '../modules/onu-replacement/pages/onu-replacement-list.page'
import { OnuReplacementDetailPage } from '../modules/onu-replacement/pages/onu-replacement-detail.page'

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
      path: '/olt/create',
      element: 
        <ProtectedRoute>
          <DashboardLayout>
            <OltCreatePage />
          </DashboardLayout>
        </ProtectedRoute>
    },
    {
      path: '/olt/:id/edit',
      element: 
        <ProtectedRoute>
          <DashboardLayout>
            <OltEditPage />
          </DashboardLayout>
        </ProtectedRoute>
    },
    {
      path: '/olts',
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <OltListPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/olt/:id',
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <OltDetailPage />
          </DashboardLayout>
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
    },
    {
      path: '/telegram-bots',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <TelegramBotListPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },

    {
      path: '/telegram-bots/create',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <TelegramBotCreatePage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/telegram-bots/:id',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <TelegramBotDetailPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },
    {
      path: '/onu/replacements',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <OnuReplacementListPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    },

    {
      path: '/onu/replacements/:id',

      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <OnuReplacementDetailPage />
          </DashboardLayout>
        </ProtectedRoute>
      )
    }
  ])