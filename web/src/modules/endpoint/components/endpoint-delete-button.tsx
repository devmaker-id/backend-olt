import {
  useState
} from 'react'

import {
  Trash2
} from 'lucide-react'

import {
  Button
} from '@/components/ui/button'

import {
  ConfirmDelete
} from '@/shared/components/confirm-delete'

import {
  useDeleteEndpoint
} from '../hooks/use-delete-endpoint'

interface Props {

  endpointId: string

  endpointName: string
}

export function EndpointDeleteButton({

  endpointId,

  endpointName

}: Props) {

  const [open, setOpen] =
    useState(false)

  const deleteMutation =
    useDeleteEndpoint()

  async function handleDelete() {

    await deleteMutation.mutateAsync({
      id: endpointId
    })

    setOpen(false)
  }

  return (
    <>

      <Button

        size="icon"

        variant="destructive"

        onClick={() =>
          setOpen(true)
        }
      >

        <Trash2
          className="h-4 w-4"
        />

      </Button>

      <ConfirmDelete
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        title="Delete Endpoint"
        description={`Delete ${endpointName} ?`}
      />

    </>
  )
}