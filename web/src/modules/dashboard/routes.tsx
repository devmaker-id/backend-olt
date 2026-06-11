import { lazyPage } from '@/shared/lib/lazy-page'
// import {
//   DashboardPage
// } from './pages/dashboard.page'

import type {
  AppRoute
} from '@/shared/types/app-route.types'

const DashboardPage =
  lazyPage(
    () =>
      import(
        './pages/dashboard.page'
      ),
    'DashboardPage',
  )

export const dashboardRoutes: AppRoute[] = [

  {
    path: 'dashboard',
    element: (
      <DashboardPage />
    )
  }
]