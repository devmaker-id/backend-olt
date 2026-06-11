import {
  Button,
} from '@/components/ui/button'

interface Props {
  page: number

  totalPages: number

  onPrevious: () => void

  onNext: () => void
}

export function UnregisteredOnuPagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: Props) {

  return (
    <div
      className="
        flex
        items-center
        justify-end
        gap-4
      "
    >

      <Button
        variant="outline"
        disabled={
          page === 1
        }
        onClick={
          onPrevious
        }
      >
        Prev
      </Button>

      <span
        className="
          text-sm
          text-muted-foreground
        "
      >

        Page {page}
        {' / '}
        {totalPages}

      </span>

      <Button
        variant="outline"
        disabled={
          page === totalPages
        }
        onClick={
          onNext
        }
      >
        Next
      </Button>

    </div>
  )
}