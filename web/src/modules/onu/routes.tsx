import {
  lazyPage,
} from '@/shared/lib/lazy-page'

const UnregisteredOnuPage =
  lazyPage(
    () =>
      import(
        './pages/unregistered-onu.page'
      ),
    'UnregisteredOnuPage',
  )

export const onuRoutes = [
  {
    path:
      'onu/unregistered',

    element: (
      <UnregisteredOnuPage />
    ),
  },
]