import type {
  ReactNode
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  cn
} from '@/lib/utils'

interface SummaryCardProps {

  title: string

  value: number | string

  icon?: ReactNode

  description?: string

  className?: string

  onClick?: () => void
}

export function SummaryCard({

  title,

  value,

  icon,

  description,

  className,

  onClick

}: SummaryCardProps) {

  return (

    <Card

      onClick={onClick}

      className={cn(

        onClick &&
        'cursor-pointer hover:shadow-md transition-shadow',

        className
      )}
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          pb-2
        "
      >

        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >

          {title}

        </CardTitle>

        {icon}

      </CardHeader>

      <CardContent>

        <div
          className="
            text-3xl
            font-bold
          "
        >

          {value}

        </div>

        {
          description && (

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >

              {description}

            </p>

          )
        }

      </CardContent>

    </Card>
  )
}