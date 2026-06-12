import {
  Eye,
  Pencil,
  Trash2,
  KeyRound,
} from 'lucide-react'

import {
  Button,
} from '@/components/ui/button'

interface Props {
  onView: () => void
  onEdit: () => void
  onDelete: () => void
  onResetPassword: () => void
}

export function UserActions({
  onView,
  onEdit,
  onDelete,
  onResetPassword
}: Props) {

  return (

    <div
      className="
        flex
        gap-2
      "
    >

      <Button
        size="icon"
        variant="outline"
        onClick={onResetPassword}
      >

        <KeyRound
          className="
            h-4
            w-4
          "
        />

      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onView}
      >

        <Eye
          className="
            h-4
            w-4
          "
        />

      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={onEdit}
      >

        <Pencil
          className="
            h-4
            w-4
          "
        />

      </Button>

      <Button
        size="icon"
        variant="destructive"
        onClick={onDelete}
      >

        <Trash2
          className="
            h-4
            w-4
          "
        />

      </Button>

    </div>

  )

}