import {
  LogoutButton
} from '@/modules/auth/components/logout-button'

import {
  SidebarContent
} from './sidebar-content'

export function Sidebar() {

  return (

    <aside
      className="
        flex
        h-screen
        w-64
        flex-col
        border-r
        bg-background
      "
    >

      <div
        className="
          border-b
          p-6
        "
      >

        <h1
          className="
            text-xl
            font-bold
          "
        >
          NMS
        </h1>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          Network Management
        </p>

      </div>

      <SidebarContent />

      <div
        className="
          border-t
          p-4
        "
      >

        <LogoutButton />

      </div>

    </aside>
  )
}