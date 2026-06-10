import {
  DashboardPage
} from './pages/dashboard.page'

import type {
  AppRoute
} from '@/shared/types/app-route.types'

export const dashboardRoutes: AppRoute[] = [

  {
    path: 'dashboard',

    element: (
      <DashboardPage />
    )
  }
]