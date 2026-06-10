import {
  sidebarConfig
} from './sidebar-config'

import {
  SidebarSection
} from './sidebar-section'

export function SidebarContent() {

  return (

    <div
      className="
        flex-1
        space-y-6
        overflow-y-auto
        p-4
      "
    >

      {
        sidebarConfig.map(
          (section, index) => (

            <SidebarSection

              key={`${section.title}-${index}`}

              title={section.title}

              items={section.items}

            />

          )
        )
      }

    </div>
  )
}