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

export const forgotPassword = async (email) => {
  const res = await client.post('/auth/forgot-password', { email })
  return res.data
}

export const resetPassword = async ({ token, password }) => {
  const res = await client.post('/auth/reset-password', { token, password })
  return res.data
}
