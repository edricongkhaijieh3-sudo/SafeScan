import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { ScrollReveal } from './ScrollReveal'

const Q1_OPTIONS = ['Daily', 'A few times a week', 'A few times a month', 'Rarely']
const Q2_OPTIONS = ['Just click it anyway', 'Google the URL', 'Ask someone', 'Use VirusTotal', 'Just ignore it']
const Q3_OPTIONS = ['Nothing, I\'d want it free', 'RM 5–20/month', 'RM 20–45/month', 'RM 45+/month for my whole family']

export function Survey({ onWaitlistUpdate }) {
  const [q1, setQ1] = useState(null)
  const [q2, setQ2] = useState(null)
  const [q3, setQ3] = useState(null)
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const allAnswered = q1 !== null && q2 !== null && q3 !== null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      if (supabase) {
        const emailVal = email.trim().toLowerCase()
        const { error: surveyError } = await supabase.from('survey_responses').insert({
          email: emailVal,
          q1_link_frequency: q1,
          q2_current_behavior: q2,
          q3_willingness_to_pay: q3,
          feedback,
        })
        if (surveyError) throw surveyError
        await supabase.from('waitlist').insert({ email: emailVal })
      }
      setStatus('success')
      onWaitlistUpdate?.()
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

  if (status === 'success') {
    return (
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#00ff87]/10 border border-[#00ff87]/30">
              <span className="text-[#00ff87] text-2xl">✓</span>
              <p className="text-white font-medium">Thank you! You're on the early access list. We'll reach out personally.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6" id="survey">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <span className="text-[#00c4ff] text-sm font-semibold tracking-wider uppercase">Quick Survey — Help Us Build This For You</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-4 mb-4">
            We have 3 questions. Takes 60 seconds.
          </h2>
          <p className="text-white/70 mb-12">Your answers directly shape what we build first.</p>
        </ScrollReveal>

        <div className="space-y-10">
          <ScrollReveal delay={100}>
            <div>
              <p className="text-white font-medium mb-3">How often do you receive a link or QR code you're not 100% sure about?</p>
              <div className="flex flex-wrap gap-2">
                {Q1_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ1(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      q1 === opt ? 'bg-[#00ff87] text-[#080c10]' : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div>
              <p className="text-white font-medium mb-3">What do you currently do when you get a suspicious link or QR code?</p>
              <div className="flex flex-wrap gap-2">
                {Q2_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ2(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      q2 === opt ? 'bg-[#00ff87] text-[#080c10]' : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div>
              <p className="text-white font-medium mb-3">If Scanguard checked everything automatically in under 2 seconds, what would you pay per month?</p>
              <div className="flex flex-wrap gap-2">
                {Q3_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ3(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      q3 === opt ? 'bg-[#00ff87] text-[#080c10]' : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {allAnswered && (
            <ScrollReveal delay={400}>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div>
                  <label htmlFor="survey-email" className="block text-white font-medium mb-2">Your email *</label>
                  <input
                    id="survey-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    disabled={status === 'loading'}
                    className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87] transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="survey-feedback" className="block text-white font-medium mb-2">Anything else you want us to know? (optional)</label>
                  <textarea
                    id="survey-feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback..."
                    rows={3}
                    disabled={status === 'loading'}
                    className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87] transition-colors disabled:opacity-50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-lg bg-[#00ff87] text-[#080c10] font-semibold hover:bg-[#00e078] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit & Join Waitlist →'}
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
