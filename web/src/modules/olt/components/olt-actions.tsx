import { Eye } from 'lucide-react'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface Props {
  id: string
  onDelete: () => void
}

export function OltActions({
  id,
  onDelete,
}: Props) {

  return (
    <>
      <div className="flex gap-2">
        <Button
          asChild
          size="icon"
          variant="outline"
        >
          <Link to={`/olt/${id}`}>
            <Eye />
          </Link>
        </Button>

        <Button
          asChild
          size="icon"
          variant="outline"
        >
          <Link
            to={`/olt/${id}/edit`}
          >
            <Pencil />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 />
        </Button>
      </div>
    </>
  )
}