import {
  Loader2,
} from 'lucide-react'

interface Props {
  text?: string
}

export function LoadingState({
  text = 'Loading...',
}: Props) {

  return (

    <div
      className="
        flex
        min-h-[200px]
        items-center
        justify-center
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-muted-foreground
        "
      >

        <Loader2
          className="
            h-4
            w-4
            animate-spin
          "
        />

        <span>
          {text}
        </span>

      </div>

    </div>

  )
}