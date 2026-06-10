import type { AppRoute } from '@/shared/types/app-route.types'
import {
  EndpointListPage
} from './pages/endpoint-list.page'

import {
  EndpointCreatePage
} from './pages/endpoint-create.page'

import {
  EndpointDetailPage
} from './pages/endpoint-detail.page'

import {
  EndpointEditPage
} from './pages/endpoint-edit.page'

export const endpointRoutes: AppRoute[] = [

  {
    path: 'endpoints',
    element: <EndpointListPage />
  },

  {
    path: 'endpoints/create',
    element: <EndpointCreatePage />
  },

  {
    path: 'endpoints/:id',
    element: <EndpointDetailPage />
  },

  {
    path: 'endpoints/:id/edit',
    element: <EndpointEditPage />
  }
]