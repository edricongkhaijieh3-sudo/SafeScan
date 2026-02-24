import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ScrollReveal } from './ScrollReveal'
import { CompanyLogosMarquee } from './CompanyLogos'
import { HeroPhoneSequence } from './HeroPhoneSequence'

export function Hero({ onWaitlistUpdate, waitlistCount = 100 }) {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00875A]/10 border border-[#00875A]/30 text-[#00875A] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00875A] animate-pulse" />
            Early Access — Founding Members
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0A0A0A] leading-[1.1] mb-6">
            Open Links. Scan QR Codes. Fear Nothing.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Scanguard checks every link, QR code, and file for threats before they reach your device — so you can click freely, always.
          </p>
        </ScrollReveal>

        {/* Phone mockups - cycling scam scenarios */}
        <ScrollReveal delay={300}>
          <div className="mb-16">
            <HeroPhoneSequence />
          </div>
        </ScrollReveal>

        {/* Team credibility strip */}
        <div className="mb-12">
            <p className="text-gray-500 text-sm mb-6">Built by people from</p>
            <div className="relative overflow-hidden py-6 min-h-[80px]">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex items-center">
              <CompanyLogosMarquee />
            </div>
          </div>
        </div>

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
                className="flex-1 px-5 py-3.5 rounded-lg bg-[#F4F5F7] border border-gray-200 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 rounded-lg bg-[#0052CC] text-white font-semibold hover:bg-[#0747A6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? '✓ Joined!' : 'Join Waitlist →'}
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              <span className="font-medium text-[#0052CC]">{waitlistCount}+ people</span> on the waitlist. No spam. No credit card.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
