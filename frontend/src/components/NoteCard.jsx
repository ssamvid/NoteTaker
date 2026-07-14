import { getCategoryStyle } from '../data/categories'

function NoteCard({ note, onDelete, onEdit, onTogglePin }) {
  return (
    <article
      className={`group flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 dark:bg-stone-900 ${
        note.pinned
          ? 'border-amber-300 dark:border-amber-500/50'
          : 'border-stone-200 dark:border-stone-800'
      }`}
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryStyle(
              note.category,
            )}`}
          >
            {note.category}
          </span>

          <div className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onTogglePin(note.id)}
              aria-label={
                note.pinned
                  ? `Unpin note titled ${note.title}`
                  : `Pin note titled ${note.title}`
              }
              className={`rounded-md p-1 transition hover:bg-stone-50 dark:hover:bg-stone-800 ${
                note.pinned
                  ? 'text-amber-500 opacity-100'
                  : 'text-stone-300 hover:text-amber-500 dark:text-stone-600'
              }`}
            >
              <svg
                className="h-4 w-4"
                fill={note.pinned ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 3l1.5 1.5L14 8l1 5-3 3-2-4-4.5 4.5L5 16l4.5-4.5-4-2 3-3 5 1 3.5-3.5z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onEdit(note)}
              aria-label={`Edit note titled ${note.title}`}
              className="rounded-md p-1 text-stone-300 transition hover:bg-stone-50 hover:text-stone-600 dark:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => onDelete(note.id)}
              aria-label={`Delete note titled ${note.title}`}
              className="rounded-md p-1 text-stone-300 transition hover:bg-stone-50 hover:text-rose-500 dark:text-stone-600 dark:hover:bg-stone-800"
            >
              <svg
                className="h-4 w-4"
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
        </div>

        <h3 className="mb-1.5 text-sm font-semibold text-stone-900 line-clamp-1 dark:text-stone-100">
          {note.title}
        </h3>
        <p className="text-sm leading-relaxed text-stone-500 line-clamp-4 dark:text-stone-400">
          {note.body}
        </p>
      </div>

      <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-stone-300 dark:text-stone-600">
        Updated {new Date(note.updatedAt).toLocaleDateString()}
      </p>
    </article>
  )
}

export default NoteCard
