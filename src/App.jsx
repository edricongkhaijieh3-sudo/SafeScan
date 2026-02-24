import { useState, useCallback, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { supabase } from './lib/supabase'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { NewsCards } from './components/NewsCards'
import { Testimonials } from './components/Testimonials'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { Survey } from './components/Survey'
import { Pricing } from './components/Pricing'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

const WAITLIST_SEED = 100 // Base number so count always looks believable

function App() {
  const [waitlistCount, setWaitlistCount] = useState(null)

  const fetchCount = useCallback(async () => {
    if (supabase) {
      try {
        const { count, error } = await supabase.from('waitlist').select('*', { count: 'exact', head: true })
        if (!error && count !== null) {
          setWaitlistCount(WAITLIST_SEED + count)
        }
      } catch {
        // Ignore
      }
    }
  }, [])

  useEffect(() => {
    if (supabase) {
      fetchCount()
    } else {
      setWaitlistCount(WAITLIST_SEED)
    }
  }, [fetchCount])

  const displayCount = waitlistCount ?? WAITLIST_SEED

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />
      <main>
        <Hero onWaitlistUpdate={fetchCount} waitlistCount={displayCount} />
        <StatsBar />
        <NewsCards />
        <Testimonials />
        <Problem />
        <HowItWorks />
        <Survey onWaitlistUpdate={fetchCount} />
        <Pricing />
        <FinalCTA onWaitlistUpdate={fetchCount} waitlistCount={displayCount} />
        <Footer />
      </main>
      <Analytics />
    </div>
  )
}

export default App
