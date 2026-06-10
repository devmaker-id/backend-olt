import {
  Outlet
} from 'react-router-dom'

import {
  Sidebar
} from '../navigation/sidebar'

import {
  Header
} from '../navigation/header'

import {
  Footer
} from '../navigation/footer'

export function DashboardLayout() {

  return (

    <div
      className="
        flex
        min-h-screen
      "
    >

      <div
        className="
          hidden
          lg:block
        "
      >

        <Sidebar />

      </div>

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >

        <Header />

        <main
          className="
            flex-1
            overflow-auto
          "
        >

          <Outlet />

        </main>

        <Footer />

      </div>

    </div>
  )
}