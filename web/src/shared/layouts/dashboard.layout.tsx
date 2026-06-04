import type {
  ReactNode
} from 'react'

import { Sidebar }
  from '../components/sidebar'

interface Props {
  children: ReactNode
}

export function DashboardLayout(
  props: Props
) {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: '20px'
        }}
      >
        {props.children}
      </main>
    </div>
  )
}