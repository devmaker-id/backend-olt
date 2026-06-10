import {
  OnuReplacementListPage
} from './pages/onu-replacement-list.page'

import {
  OnuReplacementDetailPage
} from './pages/onu-replacement-detail.page'

export const onuReplacementRoutes = [

  {
    path: 'onu/replacements',

    element: (
      <OnuReplacementListPage />
    )
  },

  {
    path: 'onu/replacements/:id',

    element: (
      <OnuReplacementDetailPage />
    )
  }
]