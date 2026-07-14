import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:30001/api/notes'

export const fetchNotes = async () => {
  const res = await axios.get(API_BASE_URL)
  return res.data
}

export const createNote = async (note) => {
  const res = await axios.post(API_BASE_URL, note)
  return res.data
}

export const updateNote = async (id, updatedFields) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, updatedFields)
  return res.data
}

export const deleteNote = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`)
}
