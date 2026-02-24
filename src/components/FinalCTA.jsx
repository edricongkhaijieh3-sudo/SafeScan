import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ScrollReveal } from './ScrollReveal'

export function FinalCTA({ onWaitlistUpdate }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      if (supabase) {
        const { error } = await supabase.from('waitlist').insert({ email: email.trim().toLowerCase() })
        if (error) throw error
      }
      setStatus('success')
      setEmail('')
      onWaitlistUpdate?.()
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  return (
    <section className="py-24 px-6" id="waitlist">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Be first in line.
          </h2>
          <p className="text-white/70 text-lg mb-12">
            We're building Scanguard for people who want to scan anything without hesitation. Join the waitlist and we'll personally reach out to early members.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-5 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87] transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 rounded-lg bg-[#00ff87] text-[#080c10] font-semibold hover:bg-[#00e078] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : 'Claim Early Access →'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
