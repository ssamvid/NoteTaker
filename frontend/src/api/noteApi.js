import client from './client'

export const fetchNotes = async () => {
  const res = await client.get('/notes')
  return res.data
}

export const createNote = async (note) => {
  const res = await client.post('/notes', note)
  return res.data
}

export const updateNote = async (id, updatedFields) => {
  const res = await client.put(`/notes/${id}`, updatedFields)
  return res.data
}

export const deleteNote = async (id) => {
  await client.delete(`/notes/${id}`)
}
