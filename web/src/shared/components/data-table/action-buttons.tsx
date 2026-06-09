import {
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
      {onView && (
        <Button
          size="icon"
          variant="outline"
          onClick={onView}
        >
          <Eye />
        </Button>
      )}

      {onEdit && (
        <Button
          size="icon"
          variant="outline"
          onClick={onEdit}
        >
          <Pencil />
        </Button>
      )}

      {onDelete && (
        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 />
        </Button>
      )}
    </div>
  )
}