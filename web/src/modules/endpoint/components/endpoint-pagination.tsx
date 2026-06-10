import {
  Button
} from '@/components/ui/button'

interface EndpointPaginationProps {

  page: number

  totalPages: number

  onPrevious: () => void

  onNext: () => void
}

export function EndpointPagination({

  page,

  totalPages,

  onPrevious,

  onNext

}: EndpointPaginationProps) {

  return (

    <div
      className="
        flex
        items-center
        gap-2
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

        Previous

      </Button>

      <span>

        {page}
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