# Note Taker

A minimal notes app where users write, edit, search, and organise notes by category.

**Stack (Week 1-2 scope):** React (Vite) · Tailwind CSS
*(Full project stack per the brief: React · Tailwind CSS · Node.js · Express · MongoDB · JWT · Gemini API — backend weeks not yet in scope for this submission.)*

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          Top app bar
│   │   ├── SearchBar.jsx       Controlled search input
│   │   ├── NewNoteButton.jsx   Opens the "new note" modal
│   │   ├── NoteGrid.jsx        Responsive card grid + empty state
│   │   ├── NoteCard.jsx        Single note card with category badge + delete
│   │   └── NewNoteModal.jsx    Controlled form for creating a note
│   ├── data/
│   │   ├── sampleNotes.js      4 hardcoded seed notes
│   │   └── categories.js       Category list + badge colour styles
│   ├── App.jsx                 App state, handlers, layout
│   ├── main.jsx                Entry point
│   └── index.css               Tailwind import + base styles
├── index.html
├── vite.config.js              Vite + @tailwindcss/vite plugin
└── package.json
```

## What's implemented

### Week 1 — React Setup + Note UI
- React + Vite project with Tailwind CSS wired up via `@tailwindcss/vite`.
- Reusable components: `NoteCard`, `NoteGrid`, `NewNoteButton`, `SearchBar`.
- Four sample notes rendered in a responsive card grid (1 col mobile → 4 cols desktop).
- Colour-coded category badges (Personal / Work / Study).
- Clean, minimal Tailwind theme (neutral stone palette, soft shadows, rounded corners).

### Week 2 — State & Note Interactions
- `useState` holds the notes array; `NoteGrid` renders a `NoteCard` per note.
- `NewNoteModal` with controlled `title` / `body` inputs and a category picker.
- Submitting the form adds the note to state and resets the form fields.
- Each card has a delete action that removes the note from state.
- Live search: typing in the search bar filters notes by title as you type.
- `useEffect` logs the current note count to the console every time the notes array changes.

## Git Workflow

```bash
git init
git add .
git commit -m "Week 1 & 2: static UI, state, and note interactions"
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

Recommended: create a `week-2` feature branch for this session's work and merge it into `main` once reviewed.

## Next Steps (later weeks, not part of this submission)

- Week 3: Express REST API (`/api/notes` CRUD).
- Week 4: MongoDB persistence via Mongoose + Axios wiring.
- Week 5: JWT authentication, per-user notes.
- Week 6: Deployment (Render + Netlify) and CI/CD.
- Week 7: Gemini API note summariser.
