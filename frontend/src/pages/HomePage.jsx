import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import developerPhoto from '../assets/developer-photo.jpg'

const PREVIEW_NOTES = [
  {
    title: 'Sprint planning',
    body: 'Split the API work into three tickets. Ask design about modal spacing before standup.',
    category: 'Work',
    style: 'bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30',
    rotate: '-rotate-3',
  },
  {
    title: 'Weekend trip',
    body: 'Book the cabin, pack hiking boots, check the weather for Saturday.',
    category: 'Personal',
    style: 'bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30',
    rotate: 'rotate-2',
  },
  {
    title: 'Reading list',
    body: 'Finish chapter 4 before the seminar. Summarize key arguments for discussion.',
    category: 'Study',
    style: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30',
    rotate: '-rotate-1',
  },
]

const FEATURES = [
  {
    title: 'Stay organized',
    description: 'Sort notes by category and pin the ones you need close at hand.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h10M4 18h16"
      />
    ),
  },
  {
    title: 'Find things fast',
    description: 'Live search and category filters surface the right note in seconds.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    ),
  },
  {
    title: 'Summarize with AI',
    description: 'Long note? Get a clean, few-sentence summary powered by Gemini.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36l-1.42 1.42M7.05 16.95l-1.42 1.42m0-12.74l1.42 1.42M16.95 16.95l1.42 1.42M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    ),
  },
]

function HomePage() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-sm font-semibold text-white dark:bg-stone-100 dark:text-stone-900">
            N
          </span>
          <span className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Note Taker
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364 6.364l-1.06-1.06M6.696 6.696l-1.06-1.06m12.728 0l-1.06 1.06M6.696 17.304l-1.06 1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-stone-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
          >
            Sign up
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
              A calm place for your notes.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone-500 dark:text-stone-400">
              Capture what matters, organize it by category, and let AI
              summarize the long ones. No clutter, just your notes.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                to="/signup"
                className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
              >
                Get started — it's free
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:border-stone-600 dark:hover:bg-stone-800"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="relative hidden h-72 sm:block">
            {PREVIEW_NOTES.map((note, index) => (
              <div
                key={note.title}
                className={`absolute w-64 rounded-xl border border-stone-200 bg-white p-4 shadow-lg transition-transform dark:border-stone-800 dark:bg-stone-900 ${note.rotate}`}
                style={{
                  top: `${index * 46}px`,
                  left: `${index * 56}px`,
                  zIndex: index,
                }}
              >
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${note.style}`}
                >
                  {note.category}
                </span>
                <h3 className="mt-2.5 text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {note.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-t border-stone-200 py-16 dark:border-stone-800 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {feature.icon}
                </svg>
              </span>
              <h3 className="mt-3 text-sm font-semibold text-stone-900 dark:text-stone-100">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-col items-center gap-10 border-t border-stone-200 py-16 dark:border-stone-800 sm:flex-row sm:justify-center">
          <div className="relative shrink-0">
            <div className="absolute -inset-3 -rotate-3 rounded-[2rem] bg-cyan-100 dark:bg-cyan-500/10" />
            <img
              src={developerPhoto}
              alt="Samvid Shrestha as a kid, pointing confidently at the camera by a lake"
              className="relative h-40 w-40 rotate-2 rounded-3xl border-4 border-white object-cover shadow-xl dark:border-stone-900 sm:h-48 sm:w-48"
            />
          </div>

          <div className="max-w-sm text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-500">
              Meet the developer
            </p>
            <h2 className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-100">
              Samvid Shrestha
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Main developer of this note taker — built end to end, front to
              back. Confidently pointing at things since long before he could
              write a line of code.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {['React', 'Node.js', 'MongoDB', 'Gemini AI'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-8 dark:border-stone-800">
        <p className="text-center text-xs text-stone-400 dark:text-stone-600">
          Built by Samvid Shrestha.
        </p>
      </footer>
    </div>
  )
}

export default HomePage
