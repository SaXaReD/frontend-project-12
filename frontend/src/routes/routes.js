const BASE_URL = '/api/v1'

export const apiPath = {
  login: () => `${BASE_URL}/login`,
  signup: () => `${BASE_URL}/signup`,
}

export const routes = {
  main: '/',
  login: '/login',
  signup: '/signup',
}
