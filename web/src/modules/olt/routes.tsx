import {
  OltListPage
} from './pages/olt-list.page'

import {
  OltCreatePage
} from './pages/olt-create.page'

import {
  OltDetailPage
} from './pages/olt-detail.page'

import {
  OltEditPage
} from './pages/olt-edit.page'

export const oltRoutes = [

  {
    path: 'olts',
    element: <OltListPage />
  },

  {
    path: 'olt/create',
    element: <OltCreatePage />
  },

  {
    path: 'olt/:id',
    element: <OltDetailPage />
  },

  {
    path: 'olt/:id/edit',
    element: <OltEditPage />
  }
]