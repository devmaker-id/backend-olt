import {
  UserMenu,
} from '@/modules/users/components/user-menu'
import {
  SidebarContent
} from './sidebar-content'
import { SidebarBrand } from './sidebar-brand'

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

      <SidebarBrand />

      <SidebarContent />

      <div
        className="
          border-t
          p-4
        "
      >
        <UserMenu />

      </div>

    </aside>
  )
}