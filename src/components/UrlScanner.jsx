import { useState } from 'react'

const STORAGE_KEY = 'scanguard_scan_count'
const FREE_SCAN_LIMIT = 3

function getScanCount() {
  try {
    const n = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
    return isNaN(n) ? 0 : n
  } catch {
    return 0
  }
}

function incrementScanCount() {
  try {
    const n = getScanCount() + 1
    localStorage.setItem(STORAGE_KEY, String(n))
    return n
  } catch {
    return 1
  }
}

export function UrlScanner({ onSignUpClick }) {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | safe | threat | error
  const [message, setMessage] = useState('')
  const [details, setDetails] = useState(null)
  const [scanCount, setScanCount] = useState(getScanCount)

  const atLimit = scanCount >= FREE_SCAN_LIMIT

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    if (atLimit) {
      onSignUpClick?.()
      return
    }

    setStatus('loading')
    setMessage('')
    setDetails(null)

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        if (res.status === 404) {
          setMessage(
            import.meta.env.DEV
              ? "Scanner API not found. Run 'vercel dev' instead of 'npm run dev' to test locally."
              : 'Scanner temporarily unavailable. Please try again later.',
          )
        } else {
          setMessage(data?.error || 'Something went wrong')
        }
        return
      }

      const newCount = incrementScanCount()
      setScanCount(newCount)

      if (data.safe) {
        setStatus('safe')
        setMessage('Safe')
        setDetails(data.harmless != null ? `${data.harmless} engine(s) reported harmless` : null)
      } else {
        setStatus('threat')
        setMessage('Threat detected')
        setDetails(data.message || null)
      }
    } catch {
      setStatus('error')
      setMessage('Could not reach scanner. Please try again.')
    }
  }

  return (
    <div className="mb-16">
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste any suspicious link here"
              disabled={status === 'loading' || atLimit}
              className="flex-1 px-4 py-3.5 rounded-lg bg-white border-2 border-gray-200 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 rounded-lg bg-[#0052CC] text-white font-semibold hover:bg-[#0747A6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Scanning...' : atLimit ? 'Sign up free →' : 'Scan link — free'}
            </button>
          </div>

          {/* Result */}
          {(status === 'safe' || status === 'threat' || status === 'error') && (
            <div
              className={`rounded-lg p-4 border-2 ${
                status === 'safe'
                  ? 'bg-[#00875A]/10 border-[#00875A]/40'
                  : status === 'threat'
                    ? 'bg-[#DE350B]/10 border-[#DE350B]/50'
                    : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {status === 'safe' && (
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00875A] text-white">
                    ✓
                  </span>
                )}
                {status === 'threat' && (
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#DE350B] text-white">
                    ⚠
                  </span>
                )}
                <div>
                  <p
                    className={`font-bold ${
                      status === 'safe'
                        ? 'text-[#00875A]'
                        : status === 'threat'
                          ? 'text-[#DE350B]'
                          : 'text-gray-600'
                    }`}
                  >
                    {status === 'safe' ? 'SAFE' : status === 'threat' ? 'THREAT DETECTED' : 'Error'}
                  </p>
                  {details && (
                    <p className="text-sm text-[#0A0A0A]/70 mt-0.5">{details}</p>
                  )}
                  {status === 'error' && message && (
                    <p className="text-sm text-gray-600 mt-0.5">{message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA after 3 scans */}
          {atLimit && (
            <p className="text-center text-sm text-gray-500">
              Get 5 free scans/day —{' '}
              <button
                type="button"
                onClick={onSignUpClick}
                className="font-semibold text-[#0052CC] hover:underline"
              >
                sign up free →
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
