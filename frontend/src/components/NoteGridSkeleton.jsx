function NoteGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="mb-4 h-4 w-16 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="mb-2 h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="mb-1.5 h-3 w-full rounded bg-stone-100 dark:bg-stone-800" />
          <div className="mb-1.5 h-3 w-full rounded bg-stone-100 dark:bg-stone-800" />
          <div className="h-3 w-2/3 rounded bg-stone-100 dark:bg-stone-800" />
        </div>
      ))}
    </div>
  )
}

export default NoteGridSkeleton
