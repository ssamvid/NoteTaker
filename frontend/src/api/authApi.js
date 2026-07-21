import client from './client'

export const register = async ({ name, email, password }) => {
  const res = await client.post('/auth/register', { name, email, password })
  return res.data
}

export const login = async ({ email, password }) => {
  const res = await client.post('/auth/login', { email, password })
  return res.data
}

export const fetchMe = async () => {
  const res = await client.get('/auth/me')
  return res.data.user
}
