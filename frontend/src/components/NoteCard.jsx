import { useState } from 'react'
import { getCategoryStyle } from '../data/categories'
import { summarizeNote } from '../api/noteApi'

function NoteCard({ note, onDelete, onEdit, onTogglePin }) {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [summary, setSummary] = useState(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summaryError, setSummaryError] = useState(null)

  const closeView = () => {
    setIsViewOpen(false)
    setSummary(null)
    setSummaryError(null)
  }

  const handleSummarize = async () => {
    setIsSummarizing(true)
    setSummaryError(null)
    try {
      const result = await summarizeNote(note.id)
      setSummary(result)
    } catch {
      setSummaryError('Could not summarize this note. Please try again.')
    } finally {
      setIsSummarizing(false)
    }
  }

  const stopAnd = (handler) => (event) => {
    event.stopPropagation()
    closeView()
    handler()
  }

  const renderActionButtons = (visibilityClass) => (
    <div className={`flex items-center gap-0.5 transition ${visibilityClass}`}>
      <button
        type="button"
        onClick={stopAnd(() => onTogglePin(note.id))}
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
        onClick={stopAnd(() => onEdit(note))}
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
        onClick={stopAnd(() => onDelete(note.id))}
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )

  return (
    <>
      <article
        onClick={() => setIsViewOpen(true)}
        className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition duration-200 ease-out hover:scale-[1.02] hover:shadow-md dark:bg-stone-900 ${
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
            {renderActionButtons('opacity-0 group-hover:opacity-100')}
          </div>

          <h3 className="mb-1.5 text-sm font-semibold text-stone-900 line-clamp-1 dark:text-stone-100">
            {note.title}
          </h3>
          <p className="line-clamp-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {note.body}
          </p>
        </div>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-stone-300 dark:text-stone-600">
          Updated {new Date(note.updatedAt).toLocaleDateString()}
        </p>
      </article>

      {isViewOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-stone-900/50 p-4"
          onClick={closeView}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryStyle(
                  note.category,
                )}`}
              >
                {note.category}
              </span>
              <button
                type="button"
                onClick={closeView}
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

            <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">
              {note.title}
            </h2>
            <p className="mb-4 whitespace-pre-wrap overflow-y-auto text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {note.body}
            </p>

            <div className="mb-4">
              {summary ? (
                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-500/10">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-500">
                    AI summary
                  </p>
                  <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    {summary}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-500/50 dark:text-amber-500 dark:hover:bg-amber-500/10"
                >
                  {isSummarizing ? 'Summarizing…' : 'Summarize with AI'}
                </button>
              )}
              {summaryError && (
                <p className="mt-1.5 text-xs text-rose-500">{summaryError}</p>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
              <p className="text-[11px] font-medium uppercase tracking-wide text-stone-300 dark:text-stone-600">
                Updated {new Date(note.updatedAt).toLocaleDateString()}
              </p>
              {renderActionButtons('opacity-100')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NoteCard
