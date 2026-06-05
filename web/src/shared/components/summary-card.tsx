interface Props {
  title: string
  value: number
}

export function SummaryCard(
  props: Props
) {
  return (
    <div>
      <h3>
        {props.title}
      </h3>

      <h1>
        {props.value}
      </h1>
    </div>
  )
}