import type {
  ReactNode,
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  title: string

  children: ReactNode
}

export function DetailSheetSection({
  title,
  children,
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent
        className="
          space-y-2
        "
      >

        {children}

      </CardContent>

    </Card>

  )
}