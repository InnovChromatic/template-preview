import { useState, type FormEvent, type ReactNode } from 'react'

const STORAGE_KEY = 'ic-gallery-ok'

function expectedPin() {
  const value = import.meta.env.VITE_GALLERY_PIN
  if (value === undefined || value === null) return 'preview'
  return String(value)
}

function isEmbeddedDemo() {
  return window.location.pathname.startsWith('/demo/')
}

export function AuthGate({ children }: { children: ReactNode }) {
  const pin = expectedPin()
  const [unlocked, setUnlocked] = useState(() => {
    if (!pin || isEmbeddedDemo()) return true
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  })
  const [attempt, setAttempt] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return children

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (attempt === pin) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setUnlocked(true)
      return
    }
    setError(true)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="soft-card w-full max-w-md rounded-[2rem] px-8 py-10 animate-fade-up"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
          InnovChromatic
        </p>
        <h1 className="font-headline mt-3 text-3xl font-extrabold tracking-tight">
          Template gallery
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Private library for client walkthroughs. Enter the studio PIN to open the
          collection.
        </p>
        <label className="mt-8 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          PIN
        </label>
        <input
          type="password"
          value={attempt}
          autoFocus
          onChange={(event) => {
            setAttempt(event.target.value)
            setError(false)
          }}
          className="mt-2 w-full rounded-full border border-line bg-white px-5 py-3 text-base outline-none focus:border-primary"
        />
        {error ? (
          <p className="mt-2 text-sm text-red-700">That PIN does not match.</p>
        ) : null}
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-on-primary"
        >
          Open gallery
        </button>
      </form>
    </main>
  )
}
