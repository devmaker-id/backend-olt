export function getToken() {
  return localStorage.getItem(
    'token'
  )
}

export function hasToken() {
  return Boolean(
    localStorage.getItem(
      'token',
    ),
  )
}

export function getUser() {

  const user =
    localStorage.getItem(
      'user'
    )

  if (!user) {
    return null
  }

  return JSON.parse(
    user
  )
}

export function isAuthenticated() {
  return !!getToken()
}

export function login(
  token: string,
  user: unknown
) {

  localStorage.setItem(
    'token',
    token
  )

  localStorage.setItem(
    'user',
    JSON.stringify(user)
  )
}

export function logout() {

  localStorage.removeItem(
    'token'
  )

  localStorage.removeItem(
    'user'
  )
}