import type { ReactNode } from 'react'

interface DataTableToolbarProps {
  search?: ReactNode
  actions?: ReactNode
}

export function DataTableToolbar({
  search,
  actions,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        {search}
      </div>

      <div className="flex items-center gap-2">
        {actions}
      </div>
    </div>
  )
}