import { lazy } from 'react'

export function lazyPage<T>(
  importer: () => Promise<T>,
  exportName: keyof T,
) {
  return lazy(() =>
    importer().then(module => ({
      default: module[exportName] as React.ComponentType,
    })),
  )
}