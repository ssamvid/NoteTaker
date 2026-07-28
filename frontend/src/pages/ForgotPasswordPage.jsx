import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as authApi from '../api/authApi'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await authApi.forgotPassword(email)
      setIsSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 dark:bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        {isSubmitted ? (
          <>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Check your inbox
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              If an account with that email exists, we've sent a link to reset
              your password. It expires in 1 hour.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
              Forgot your password?
            </h1>
            <p className="mt-1 text-sm text-stone-400">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-medium text-stone-500">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                />
              </div>

              {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                {isSubmitting ? 'Sending…' : 'Send reset link'}
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

export default ForgotPasswordPage
