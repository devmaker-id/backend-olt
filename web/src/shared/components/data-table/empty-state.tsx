interface Props {
  title?: string

  description?: string
}

export function EmptyState({
  title = 'No Data',
  description,
}: Props) {

  return (

    <div
      className="
        flex
        min-h-[160px]
        flex-col
        items-center
        justify-center
        text-center
      "
    >

      <h3
        className="
          font-medium
        "
      >
        {title}
      </h3>

      {description && (

        <p
          className="
            mt-1
            text-sm
            text-muted-foreground
          "
        >
          {description}
        </p>

      )}

    </div>

  )
}