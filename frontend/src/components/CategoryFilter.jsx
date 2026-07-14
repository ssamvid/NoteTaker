import { CATEGORIES } from '../data/categories'

function CategoryFilter({ activeCategory, onChange }) {
  const options = ['All', ...CATEGORIES]

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            activeCategory === option
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
              : 'bg-white text-stone-500 ring-1 ring-inset ring-stone-200 hover:border-stone-300 dark:bg-stone-900 dark:text-stone-400 dark:ring-stone-700'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
