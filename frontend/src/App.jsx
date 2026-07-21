import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotesPage from './pages/NotesPage'
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<NotesPage />} />
      </Route>
    </Routes>
  )
}

export default App
