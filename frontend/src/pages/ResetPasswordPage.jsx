import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as authApi from '../api/authApi'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await authApi.resetPassword({ token, password })
      setIsDone(true)
    } catch (err) {
      setError(
        err.response?.data?.message ?? 'This reset link is invalid or has expired.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 dark:bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        {!token ? (
          <>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Invalid link
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              This password reset link is missing its token. Request a new
              one from the forgot password page.
            </p>
          </>
        ) : isDone ? (
          <>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Password updated
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              You can now log in with your new password.
            </p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-4 w-full rounded-lg bg-stone-900 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Go to log in
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Choose a new password
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="password" className="mb-1 block text-xs font-medium text-stone-500">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-xs font-medium text-stone-500"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                {isSubmitting ? 'Resetting…' : 'Reset password'}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-stone-400">
          <Link to="/login" className="font-medium text-stone-700 hover:underline dark:text-stone-200">
            Back to log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPasswordPage
