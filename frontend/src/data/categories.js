// Central place for category styling so every component that renders a
// category badge stays visually consistent.
export const CATEGORIES = ['Personal', 'Work', 'Study']

export const CATEGORY_STYLES = {
  Personal: 'bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-200',
  Work: 'bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-200',
  Study: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200',
}

export const getCategoryStyle = (category) =>
  CATEGORY_STYLES[category] ??
  'bg-stone-100 text-stone-600 ring-1 ring-inset ring-stone-200'
