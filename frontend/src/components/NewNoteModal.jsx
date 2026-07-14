import { useState } from 'react'
import { CATEGORIES } from '../data/categories'

function NewNoteModal({ onClose, onSave, initialNote }) {
  const isEditing = Boolean(initialNote)

  // Controlled inputs: React state is the single source of truth for each field.
  const [title, setTitle] = useState(initialNote?.title ?? '')
  const [body, setBody] = useState(initialNote?.body ?? '')
  const [category, setCategory] = useState(initialNote?.category ?? CATEGORIES[0])

  const handleSubmit = (e) => {
    e.preventDefault() // stop the browser from reloading the page
    if (!title.trim() || !body.trim()) return

    onSave({ title: title.trim(), body: body.trim(), category })

    if (!isEditing) {
      // Reset the form after saving a brand-new note
      setTitle('')
      setBody('')
      setCategory(CATEGORIES[0])
    }
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-stone-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {isEditing ? 'Edit note' : 'New note'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-stone-400 hover:bg-stone-50 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              autoFocus
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-stone-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
              Note
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write something..."
              rows={4}
              className="w-full resize-none rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-stone-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
              Category
            </label>
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    category === cat
                      ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-200 text-stone-500 hover:border-stone-300 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-stone-900 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            {isEditing ? 'Save changes' : 'Save note'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewNoteModal
