import {
  lazyPage,
} from '@/shared/lib/lazy-page'

const OltListPage =
  lazyPage(
    () =>
      import(
        './pages/olt-list.page'
      ),
    'OltListPage',
  )

const OltCreatePage =
  lazyPage(
    () =>
      import(
        './pages/olt-create.page'
      ),
    'OltCreatePage',
  )

const OltDetailPage =
  lazyPage(
    () =>
      import(
        './pages/olt-detail.page'
      ),
    'OltDetailPage',
  )

const OltEditPage =
  lazyPage(
    () =>
      import(
        './pages/olt-edit.page'
      ),
    'OltEditPage',
  )

export const oltRoutes = [

  {
    path: 'olts',
    element: (
      <OltListPage />
    ),
  },

  {
    path: 'olt/create',
    element: (
      <OltCreatePage />
    ),
  },

  {
    path: 'olt/:id',
    element: (
      <OltDetailPage />
    ),
  },

  {
    path: 'olt/:id/edit',
    element: (
      <OltEditPage />
    ),
  },

]