function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 dark:bg-stone-950">
      <span className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-2 border-stone-200 border-t-stone-900 dark:border-stone-800 dark:border-t-stone-100" />
      <p className="text-sm font-medium text-stone-400">Loading your notes…</p>
    </div>
  )
}

export default LoadingScreen
