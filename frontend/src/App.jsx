import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotesPage from './pages/NotesPage'
import HomePage from './pages/HomePage'
import LoadingScreen from './components/LoadingScreen'
import { GuestRoute } from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

// "/" shows the marketing homepage to guests and the notes app to
// signed-in users, so login/signup can keep navigating to "/".
function Root() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingScreen />
  return user ? <NotesPage /> : <HomePage />
}

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/" element={<Root />} />
    </Routes>
  )
}

export default App
