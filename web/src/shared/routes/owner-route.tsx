import {
  Navigate,
} from 'react-router-dom'

interface Props {

  children: React.ReactNode

}

export function OwnerRoute({
  children,
}: Props) {

  const user =
    JSON.parse(
      localStorage.getItem(
        'user',
      ) || '{}',
    )

  if (
    user.role !==
    'OWNER'
  ) {

    return (

      <Navigate
        to="/dashboard"
        replace
      />

    )

  }

  return children

}