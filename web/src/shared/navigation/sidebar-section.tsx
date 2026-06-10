import type {
  NavigationSection
} from './navigation.types'

import {
  SidebarItem
} from './sidebar-item'

export function SidebarSection({

  title,

  items

}: NavigationSection) {

  return (

    <div
      className="
        space-y-1
      "
    >

      <div
        className="
          px-3
          text-xs
          font-semibold
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >

        {title}

      </div>

      {
        items.map(
          (item) => (

            <SidebarItem

              key={item.path}

              {...item}

            />

          )
        )
      }

    </div>
  )
}