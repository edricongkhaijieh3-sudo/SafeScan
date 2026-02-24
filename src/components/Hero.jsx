import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ScrollReveal } from './ScrollReveal'
import { CompanyLogosMarquee } from './CompanyLogos'
import { HeroPhoneSequence } from './HeroPhoneSequence'

export function Hero({ onWaitlistUpdate }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

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
      onWaitlistUpdate?.() // refreshes waitlist count
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#00ff87]/20 text-[#00ff87] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            Early Access — Founding Members
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6">
            Scan Anything. Fear Nothing.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-16">
            Scanguard automatically checks QR codes, links, and files for threats before they reach your device. No tech knowledge needed. Just scan.
          </p>
        </ScrollReveal>

        {/* Phone mockups - cycling scam scenarios */}
        <ScrollReveal delay={300}>
          <div className="mb-16">
            <HeroPhoneSequence />
          </div>
        </ScrollReveal>

        {/* Team credibility strip */}
        <ScrollReveal delay={400}>
          <div className="mb-12">
            <p className="text-white/50 text-sm mb-6">Built by people from</p>
            <div className="relative overflow-hidden py-6">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080c10] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080c10] to-transparent z-10 pointer-events-none" />
              <div className="flex animate-marquee">
                <CompanyLogosMarquee />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Email capture */}
        <ScrollReveal delay={500}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
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
                className="px-6 py-3.5 rounded-lg bg-[#00ff87] text-[#080c10] font-semibold hover:bg-[#00e078] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : 'Join Waitlist →'}
              </button>
            </div>
            <p className="text-white/40 text-sm mt-3">No spam. No credit card. Just early access when we launch.</p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
