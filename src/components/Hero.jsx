import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ScrollReveal } from './ScrollReveal'
import { CompanyLogosMarquee } from './CompanyLogos'

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
            SafeScan automatically checks QR codes, links, and files for threats before they reach your device. No tech knowledge needed. Just scan.
          </p>
        </ScrollReveal>

        {/* Phone mockups */}
        <ScrollReveal delay={300}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
            {/* Left phone - Phishing SMS */}
            <div className="relative w-[280px] sm:w-[300px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="rounded-[2.5rem] border-2 border-white/10 bg-[#0d1117] p-2 shadow-2xl">
                <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1a] h-[560px]">
                  <div className="h-12 flex items-center justify-center border-b border-white/10">
                    <div className="w-20 h-1 rounded-full bg-white/30" />
                  </div>
                  <div className="p-4 space-y-3 font-body text-sm">
                    <div className="text-white/50 text-xs">Messages</div>
                    <div className="bg-[#2d2d2d] rounded-2xl rounded-bl-md p-3">
                      <div className="text-white/60 text-xs mb-1">+60 12-XXX XXXX</div>
                      <p className="text-white/90">Your Maybank account has been suspended. Verify now to avoid closure:</p>
                      <a href="#" className="text-[#00c4ff] underline">bit.ly/3xH9kp2-secure</a>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#0e639c] rounded-2xl rounded-br-md p-3 max-w-[80%]">
                        <p className="text-white text-xs">Is this legit? Should I click?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - QR mockup with scanning line */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 rounded-xl bg-white p-2 overflow-hidden">
                <svg viewBox="0 0 21 21" className="w-full h-full">
                  <rect width="21" height="21" fill="white" />
                  <rect x="1" y="1" width="5" height="5" fill="#080c10" />
                  <rect x="15" y="1" width="5" height="5" fill="#080c10" />
                  <rect x="1" y="15" width="5" height="5" fill="#080c10" />
                  <rect x="7" y="1" width="2" height="2" fill="#080c10" />
                  <rect x="7" y="5" width="2" height="2" fill="#080c10" />
                  <rect x="11" y="1" width="2" height="2" fill="#080c10" />
                  <rect x="15" y="7" width="2" height="2" fill="#080c10" />
                  <rect x="1" y="7" width="2" height="6" fill="#080c10" />
                  <rect x="5" y="7" width="2" height="2" fill="#080c10" />
                  <rect x="7" y="9" width="4" height="4" fill="#080c10" />
                  <rect x="13" y="9" width="2" height="4" fill="#080c10" />
                  <rect x="9" y="15" width="4" height="2" fill="#080c10" />
                  <rect x="17" y="13" width="2" height="4" fill="#080c10" />
                </svg>
                <div className="absolute inset-0 flex justify-center pointer-events-none" style={{ animation: 'scan-line 2s ease-in-out infinite' }}>
                  <div className="w-full h-0.5 bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
                </div>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ff87" strokeWidth="2" className="mt-3 animate-pulse">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-xs font-medium mt-1 text-[#00ff87]">SafeScan</span>
            </div>

            {/* Right phone - Verdict screen */}
            <div className="relative w-[280px] sm:w-[300px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="rounded-[2.5rem] border-2 border-[#ff4444]/30 bg-[#0d1117] p-2 shadow-2xl shadow-[#ff4444]/10">
                <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1a] h-[560px]">
                  <div className="h-12 flex items-center justify-center border-b border-white/10">
                    <div className="w-20 h-1 rounded-full bg-white/30" />
                  </div>
                  <div className="p-4 space-y-3 font-body text-sm">
                    <div className="bg-[#ff4444]/20 border border-[#ff4444]/40 rounded-xl p-3 text-center">
                      <span className="text-[#ff4444] font-bold text-xs">⚠ THREAT DETECTED</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[#ff4444] font-semibold">Phishing Link</div>
                      <div className="text-white/70 text-xs">Fake Banking Site</div>
                      <div className="text-white/60 text-xs">Credential Harvester Identified</div>
                    </div>
                    <div className="flex justify-center py-4">
                      <span className="px-6 py-3 rounded-xl bg-[#ff4444]/30 border border-[#ff4444] text-[#ff4444] font-bold text-lg">
                        BLOCKED
                      </span>
                    </div>
                    <p className="text-white/50 text-xs text-center">SafeScan prevented this threat from reaching your device.</p>
                  </div>
                </div>
              </div>
            </div>
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
