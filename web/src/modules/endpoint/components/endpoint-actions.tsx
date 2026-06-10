import {
  Eye,
  Pen
} from 'lucide-react'

import {
  Link
} from 'react-router-dom'

import {
  Button
} from '@/components/ui/button'

import {
  EndpointDeleteButton
} from './endpoint-delete-button'

interface Props {

  endpointId: string

  endpointName: string
}

export function EndpointActions({

  endpointId,

  endpointName

}: Props) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <Button
        asChild
        size="icon"
        variant="outline"
      >

        <Link
          to={`/endpoints/${endpointId}`}
        >

          <Eye
            className="
              h-4
              w-4
            "
          />

        </Link>

      </Button>

      <Button
        asChild
        size="icon"
        variant="outline"
      >

        <Link
          to={`/endpoints/${endpointId}/edit`}
        >

          <Pen
            className="
              h-4
              w-4
            "
          />

        </Link>

      </Button>

      <EndpointDeleteButton

        endpointId={
          endpointId
        }

        endpointName={
          endpointName
        }

      />

    </div>
  )
}