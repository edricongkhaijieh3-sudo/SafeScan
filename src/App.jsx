import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabase'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { StatsBar } from './components/StatsBar'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { Survey } from './components/Survey'
import { Pricing } from './components/Pricing'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

function App() {
  const [waitlistCount, setWaitlistCount] = useState(null)

  const fetchCount = useCallback(async () => {
    if (!supabase) {
      setWaitlistCount(0)
      return
    }
    try {
      const { count, error } = await supabase.from('waitlist').select('*', { count: 'exact', head: true })
      if (!error) setWaitlistCount(count ?? 0)
    } catch {
      setWaitlistCount(0)
    }
  }, [])

  useEffect(() => {
    fetchCount()
    const interval = setInterval(fetchCount, 30000)
    return () => clearInterval(interval)
  }, [fetchCount])

  return (
    <div className="min-h-screen bg-[#080c10]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />
      <main>
        <Hero onWaitlistUpdate={fetchCount} />
        <StatsBar />
        <Problem />
        <HowItWorks />
        <Survey onWaitlistUpdate={fetchCount} />
        <Pricing />
        <FinalCTA waitlistCount={waitlistCount} onWaitlistUpdate={fetchCount} />
        <Footer />
      </main>
    </div>
  )
}

export default App
