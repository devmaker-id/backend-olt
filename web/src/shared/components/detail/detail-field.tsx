import type {
  ReactNode,
} from 'react'

interface Props {
  label: string

  value?: ReactNode
}

export function DetailField({
  label,
  value,
}: Props) {

  return (

    <div>

      <span
        className="
          font-medium
        "
      >
        {label}:
      </span>

      {' '}

      {value || '-'}

    </div>

  )
}