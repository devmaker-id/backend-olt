import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface ConfirmDeleteProps {
  open: boolean
  onOpenChange: (
    open: boolean
  ) => void
  onConfirm: () => void
  isLoading?: boolean
  title?: string
  description?: string
}

export function ConfirmDelete({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  title = 'Delete Item',
  description = 'This action cannot be undone.',
}: ConfirmDeleteProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            onClick={onConfirm}
          >
            {
              isLoading ? 'Deleting' : 'Delete'
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}