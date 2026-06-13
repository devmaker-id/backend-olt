import type {
  NavigationItem
} from './navigation.types'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function SidebarItem({
  label,
  path,
  icon: Icon,
  end,
}: NavigationItem) {
  return (
    <NavLink
      to={path}
      end={end}
      className={({
        isActive
      }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-muted font-medium'
            : 'hover:bg-muted/50'
        )
      }
    >
      <Icon
        className="
          h-4
          w-4
        "
      />
      {label}
    </NavLink>
  )
}