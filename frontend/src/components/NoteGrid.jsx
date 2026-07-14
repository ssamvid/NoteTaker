import NoteCard from './NoteCard'

function NoteGrid({ notes, onDelete, onEdit, onTogglePin, searchTerm }) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-200 bg-white/60 py-20 text-center dark:border-stone-800 dark:bg-stone-900/40">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          {searchTerm ? 'No notes match your search' : 'No notes yet'}
        </p>
        <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
          {searchTerm
            ? 'Try a different keyword.'
            : 'Click "New Note" to create your first one.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  )
}

export default NoteGrid
