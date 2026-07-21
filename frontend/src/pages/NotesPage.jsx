import { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import NewNoteButton from '../components/NewNoteButton'
import NoteGrid from '../components/NoteGrid'
import NoteGridSkeleton from '../components/NoteGridSkeleton'
import NewNoteModal from '../components/NewNoteModal'
import CategoryFilter from '../components/CategoryFilter'
import * as notesApi from '../api/noteApi'

function NotesPage() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark',
  )

  // Fetch notes from the API on mount, then keep polling so notes created
  // elsewhere (e.g. via Postman) show up without a manual refresh.
  useEffect(() => {
    let isCancelled = false

    const loadNotes = () =>
      notesApi
        .fetchNotes()
        .then((fetched) => {
          if (!isCancelled) setNotes(fetched)
        })
        .catch(() => {
          if (!isCancelled) setLoadError('Could not load notes. Is the API running?')
        })
        .finally(() => {
          if (!isCancelled) setIsLoading(false)
        })

    loadNotes()
    const intervalId = setInterval(loadNotes, 3000)

    return () => {
      isCancelled = true
      clearInterval(intervalId)
    }
  }, [])

  // Keep the <html> class and localStorage in sync with the theme choice.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleAddNote = async ({ title, body, category }) => {
    const newNote = await notesApi.createNote({ title, body, category })
    setNotes((prev) => [newNote, ...prev])
    setIsModalOpen(false)
  }

  const handleUpdateNote = async ({ title, body, category }) => {
    const updated = await notesApi.updateNote(editingNote.id, {
      title,
      body,
      category,
    })
    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note)),
    )
    setEditingNote(null)
  }

  const handleDeleteNote = async (id) => {
    await notesApi.deleteNote(id)
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  const handleTogglePin = async (id) => {
    const target = notes.find((note) => note.id === id)
    const updated = await notesApi.updateNote(id, { pinned: !target.pinned })
    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note)),
    )
  }

  // Live search + category filter, with pinned notes surfaced first.
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((note) => activeCategory === 'All' || note.category === activeCategory)
    .sort((a, b) => (b.pinned === true) - (a.pinned === true))

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <NewNoteButton onClick={() => setIsModalOpen(true)} />
        </div>

        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {isLoading ? (
          <NoteGridSkeleton />
        ) : loadError ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-rose-200 bg-rose-50/60 py-20 text-center dark:border-rose-900 dark:bg-rose-950/20">
            <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
              {loadError}
            </p>
          </div>
        ) : (
          <NoteGrid
            notes={filteredNotes}
            onDelete={handleDeleteNote}
            onEdit={setEditingNote}
            onTogglePin={handleTogglePin}
            searchTerm={searchTerm}
          />
        )}
      </main>

      {isModalOpen && (
        <NewNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />
      )}

      {editingNote && (
        <NewNoteModal
          initialNote={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={handleUpdateNote}
        />
      )}
    </div>
  )
}

export default NotesPage
